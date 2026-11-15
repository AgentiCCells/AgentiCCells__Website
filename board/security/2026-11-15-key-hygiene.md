# Key hygiene, 2026-11-15

By security@agenticcells.dinis. Checked with `stat`/`find -printf` (names and modes only) and header-line counts; no key, passphrase or token value was read or printed.

## Permissions under ~/.agents/ (checked 2026-11-15)
- Nine agent folders: abp, conductor, console, dev, dns, outreach, researcher, security, writer.
- Every agent folder is 700. Every directory inside is 700. Every file (passphrase, keygen.out, metadata, the four key files) is 600. **Meets the 700/600 rule.**
- `~/.agents/` itself is 755: any local user can list which roles have keys. Low impact here (see below); propose 700.
- Each private key and signing key is stored encrypted (header says encrypted, 18 of 18 files). keygen.out holds no private block and no passphrase line (count 0 for all nine).
- No public `.json` in team/keys/ mentions a private part (checked by the leak scan).

## Shared-container finding (for abp@, ACC-008 and ACC-016)
- Every agent runs as the same user (uid 0, root) in one container. File modes 700/600 therefore separate nothing between agents: any agent can read any other agent's private key **and** the passphrase stored beside it, so the encryption of the private key gives no protection inside the container. Any agent can sign as any other agent.
- The same holds for the environment: AWS keys, GitHub tokens and a Google Cloud token are readable by every agent (conductor's measurement, REALITY.md; not re-read here).
- Consequence: an agent's signature proves "something in this container signed", not "this role signed". The Agent: trailer and key are identification, not a boundary. This matches Dinis's model ("the permission and the authorization happens because they have right access to the repo"), so the real boundary today is push access to the repository, which every agent has.
- Barrier kind: convention (file modes), not a boundary. The narrowest change that makes it a boundary: one container (or at least one Unix user) per agent, with that agent's key folder owned by its user and no shared environment credentials.

## Proposals (not done)
- `chmod 700 ~/.agents` (proposal; it is outside the repository and the conductor's to change).
- Keep the passphrase out of the key folder, for example only in the agent's process environment, once agents run apart (proposal).

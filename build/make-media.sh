#!/usr/bin/env bash
# Makes the responsive variants the pages use (V-IMG). Needs ffmpeg and ImageMagick. Run by hand when a source changes; the outputs are committed.
set -euo pipefail
cd "$(dirname "$0")/.."
W=assets/media/websummit-2026
# Poster = first frame of the clip, so poster and video have the same 4:3 frame (no jump when the video starts).
for f in team-riskmandate-stand team-meo-arena; do
  ffmpeg -v error -y -i $W/$f-live.mp4 -frames:v 1 /tmp/$f-first.png
  convert /tmp/$f-first.png -resize 640x -quality 72 $W/$f-poster-640.webp
  convert /tmp/$f-first.png -resize 1280x -quality 72 $W/$f-poster-1280.webp
  ffmpeg -v error -y -i $W/$f-live.mp4 -an -vf scale=800:600 -c:v libx264 -crf 31 -preset slow -pix_fmt yuv420p -movflags +faststart $W/$f-live-800.mp4
done
# Portrait still of the stand (the fallback when video is not played), two widths.
convert $W/team-riskmandate-stand.jpg -resize 1200x -quality 70 $W/team-riskmandate-stand-portrait-1200.webp
# Half-width copies for srcset.
for f in team-meo-arena team-backstage team-riskmandate-stand; do
  w=$(identify -format %w $W/$f.webp); convert $W/$f.webp -resize $((w/2))x -quality 72 $W/$f-half.webp
done
for f in assets/example-*.webp assets/media/proof/[a-z]*.webp; do
  case $f in *-half.webp) continue;; esac
  w=$(identify -format %w $f); convert $f -resize $((w/2))x -quality 72 ${f%.webp}-half.webp
done

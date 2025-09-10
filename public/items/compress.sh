#!/bin/bash
TARGET_SIZE=$((1500 * 1024)) # 1.5MB in bytes

for img in *.jpg; do
  quality=90
  tmp="tmp_$img"
  cp "$img" "$tmp"
  filesize=$(stat -f%z "$tmp")

  while [ "$filesize" -gt "$TARGET_SIZE" ] && [ $quality -gt 30 ]; do
    convert "$img" -quality $quality "$tmp"
    quality=$((quality - 5))
    filesize=$(stat -f%z "$tmp")
  done

  mv "$tmp" "$img"
  echo "Processed $img -> $(stat -f%z "$img") bytes"
done
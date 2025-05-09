
# User Uploads Directory

This directory contains all user-generated content for the application.

## Directory Structure

- **`/profile-pics/`** - User and AI profile pictures
- **`/gifts/`** - Gift icons and animations
- **`/media/`** - Media files shared in chat conversations

## File Specifications

### Profile Pictures
- **Format**: JPEG or PNG (preferred)
- **Dimensions**: 512x512px recommended
- **Orientation**: Portrait format for best display
- **Max Size**: 2MB
- **File Naming**: Use UUID for filenames to prevent collisions

### Gift Icons
- **Format**: PNG or SVG (with transparent background)
- **Dimensions**: 256x256px recommended
- **Max Size**: 50KB for static images, 200KB for animations
- **File Naming**: descriptive-name.png (e.g., rose.png, heart.png)

### Media Files
- **Images**
  - Format: JPEG, PNG, WebP
  - Max Size: 2MB
  - Recommended dimensions: Up to 1920px on longest side
  
- **Videos**
  - Format: MP4, WebM
  - Max Size: 10MB
  - Max duration: 30 seconds
  - Resolution: Up to 720p
  
- **Audio**
  - Format: MP3, M4A, OGG
  - Max Size: 2MB
  - Max duration: 1 minute

## Storage Guidelines

1. All files should be named with UUIDs to prevent collisions
2. Include appropriate compression for media files before storing
3. Keep directory structure organized by user/conversation IDs

## Note on Portrait Format for Profile Pictures

Profile pictures should use portrait orientation to conform to the application's UI design. Landscape images will be center-cropped vertically, which may result in suboptimal display.

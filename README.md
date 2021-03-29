QOL fixes for Rosie Retailers because the site needs improvement.

# Features
- 24 -> 12 hour time converter
- Built-in Payment Calculator with Auto Substitution
- Payment Calculator results display on side of page when substitution modal is open for easier input
- Auto Refresh on order complete
- Remove Unnecessary Information on Order Page
- Loyality Number Formatter
- General Kerning and Design Fixes


## [TO-DO]

- TODO: Fix Bug in Payment Calculator where pressing "Review" then going back to the picklist makes the calculator not load. Possible rogue checking variable. Who knows, this whole thing is suct taped together anyways.

- TODO: Stylize Pickup/Delivery Slot



# Installation
1) Install the extension Tampermonkey
2) [Click Here to install the script](https://github.com/Ryah/Rosie-Addon-Suite/raw/main/main.user.js)
3) ???
4) Profit

# Version Changelog


## [1.61] - 2021-03-28

### Added

- Show next Pickup Slot for easier time management

### Fixed

- Time Conversion no longer breaks string when switching tabs.

## [1.6] - 2021-03-22


### Fixed

- Fixed payment calculator not filling "000000064" or showing adjustments when the first item has subs disabled and there is a substitution already on that item. Caused by code assuming the "Enable Subs" alert modal would always show up, causing the clickTargetButton function to try and click a button that doesn't exist. Now checks if the Enable Subs box appears or not and reacts accordingly.

- Made Results for payment calculator disappear if sub box is not visible.


## [1.592] - 2021-01-10

### Added

- Added "Add Blank Item" button (Not Functional Currently)

### Changed

- Made Order History Button an actual button for better reliability.

### Fixed

- Fixed Force reload script so it only reloads if the message includes the phrase "successfully marked as ready". Previously it used length. You can see how inefficient that was.

### Removed

- Enter Key Submit as it was too buggy. Will fix at a later date.


## [1.591] - 2021-01-04

### Changed

- Main script no longer hosted on Github (dependencies are still loaded from Github)
- Begin process to refactor code for next major update
- Disabled Force Reload script to rework it.

## [1.59] - 2021-01-03

### Fixed

- Actually made the calculate button...a button
- No, seriously. Every other button on rosie is a span label with an onClick event.
- I mean, it works at least 90% of the time I guess? 

### Removed

- Unused function at end of file.

## [1.58] - 2021-01-03

### Added

- Different Colors to Payment Calculator Results
- A Changelog (pog)

### Changed

- Reflected Rosie and POS prices in payment calculator for better formatting.
- Changed colors on results sidebar from green to light gray/red.
- Changed calculate button to use Rosie's CSS span label
- Made calculate button the full width of the modal card.

### Fixed

- Calculate Button being Default jQuery Button. Now uses Rosie's design.

### Removed

- My sanity and productivity

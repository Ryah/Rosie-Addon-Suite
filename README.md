General QOL fixes for Rosie Retailers because the site needs improvement.


# Version Changelog

## [Unreleased]

- TODO: Make a TODO list.
- TODO: Add an "Add Item" button to add a blank item to any order for substitutions on orders with only alcohol or tobacco (Rosie Bug-Fix) 
- TODO: Add enter key submit on adding substitutions.


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

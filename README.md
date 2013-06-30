# 

A collection of [MediaElement.js](mediaelementjs.com) plugins :

* Smart Playlists : Link a timestamped playlist to the player
* Autochange : Automatically change page URL when a media ends

These plugins are maintained by [Constructions Incongrues](http://www.constructions-incongrues.net).

## Downloading the sources

The plugins are convenientely available through [Bower](http://bower.io). Just add the following dependency to your project's ```bower.json``` file :

```
  "dependencies": {
    "net.constructions-incongrues.mejs": ">=0.*"
  }
```

and run ```bower install```.

## Smart Playlists : Installation and configuration

Make sur the feature is loaded after MediaElement.js. Add this line to your project :

```html
  <script src="vendor/mediaelement/build/mediaelement-and-player.min.js"></script>
  <script src="vendor/net.constructions-incongrues.mejs/src/mep-feature-smartplaylist.js"></script>
```

Enable and configure the plugin :

```javascript
  $('audio').mediaelementplayer(
    {
      // Enabled features
      features: ['smartplaylist'],
```

Here are the plugin default configuration values :

```javascript
  // Defaults
  $.extend(mejs.MepDefaults, {
    // This CSS class is applied to the currently playing track timestamp element
    smartplaylistCurrentClass:       'mejs-smartplaylist-current',
    // Timestamp element selector
    smartplaylistSelectorTimestamp:  'a.mejs-smartplaylist-time',
    // Playlist container selector
    smartplaylistSelectorPlaylist:   '.mejs-smartplaylist-playlist',
    // Regex used to parse timestamp
    smartplaylistTimestampRegex:     '(\\d{2}):(\\d{2}):(\\d{2})',
    // Query variable used for sharing position
    smartplaylistPositionQueryVar:   'mejs-smartplaylist-position',
    // Factors used to convert timestamp elements matched by smartplaylistTimestampRegex to seconds
    smartplaylistTimeFactors: { 
      1: 60 * 60, // Hours
      2: 60,      // Minutes
      3: 1        // Seconds
    },
    // Callback for updating page title during play. Return false deactivates page title updating
    smartplaylistPageTitleCallback:  function(currentTrack) {
      return currentTrack.attr('title');
    },
    // Page title format (available tags: timecode, title)
    smartplaylistPageTitleFormat:    '%timecode% | %title%'
  });
```

## Autochange : Installation and configuration

```html
  <script src="vendor/mediaelement/build/mediaelement-and-player.min.js"></script>
  <script src="vendor/net.constructions-incongrues.mejs/src/mep-feature-autochange.js"></script>
```

Enable and configure the plugin :

```javascript
  $('audio').mediaelementplayer(
    {
      // Enabled features
      features: ['autochange'],
```

Here are the plugin default configuration values :

```javascript
  // Defaults
  $.extend(mejs.MepDefaults, {
    autochangeSelectorNextLink: 'a.mejs-autochange-next',
    autochangeQueryString: 'mejs-autochange-play'
  });
```

# 

A collection of [MediaElement.js](mediaelementjs.com) plugins :

* Smart Playlists : Link a timestamped playlist to the player
* Autochange : Automatically change page URL when a media ends

These plugins are maintained by [Constructions Incongrues](http://www.constructions-incongrues.net).

See them in action : [http://www.ouiedire.net](http://www.ouiedire.net).

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

## Playlist format

Here is an example playlist compatible with the default configuration : 

```html
<ol class="mejs-smartplaylist-playlist">
<li><a class="mejs-smartplaylist-time">00:00:00</a> | <a href="http://www.healerselecta.co.uk">Healer Selecta</a> - Twangy Batucada</li>
<li><a class="mejs-smartplaylist-time">00:02:26</a> | <span>Yma Sumac</span> - Malambo No. 1</li>
<li><a class="mejs-smartplaylist-time">00:04:05</a> | <span>Los Demonios de Mantaro</span> - Liliana</li>
<li><a class="mejs-smartplaylist-time">00:05:20</a> | <a href="http://www.jeanjacquesperrey.com">Jean-Jacques Perrey &amp; Gershon Kingsley</a> - One Note Samba</li>
<li><a class="mejs-smartplaylist-time">00:07:23</a> | <a href="http://analogafrica.blogspot.com">Aníbal Velásquez Y Su Conjunto</a> - Mambo Loco</li>
<li><a class="mejs-smartplaylist-time">00:10:13</a> | <span>Dave Dee, Dozy, Beaky, Mick &amp;Tich</span> - Zabadak</li>
<li><a class="mejs-smartplaylist-time">00:13:51</a> | <a href="http://jessieevans.net">Jessie Evans</a> - Let Me On</li>
<li><a class="mejs-smartplaylist-time">00:17:03</a> | <a href="http://maximerobin.bandcamp.com">Maxime Robin</a> - Cleveland Shuffle (pattern funk)</li>
<li><a class="mejs-smartplaylist-time">00:19:56</a> | <span>Grupo 606</span> - Rompe,cruza O Ayúdame</li>
<li><a class="mejs-smartplaylist-time">00:21:49</a> | <a href="http://www.myspace.com/gekojones">Uproot Andy &amp; Geko Jones</a>- Manuelita RMX</li>
<li><a class="mejs-smartplaylist-time">00:25:17</a> | <a href="http://www.myspace.com/batida">Batida</a> - Bazuka (Quem Me Rusgou)</li>
<li><a class="mejs-smartplaylist-time">00:27:41</a> | <a href="http://www.myspace.com/mjgrotesque"> Manuel J Grotesque et ses amis</a> - Juan Maquina</li>
<li><a class="mejs-smartplaylist-time">00:29:42</a> | <span>Jonathan Richman &amp; The Modern Lovers</span> - Egyptian Reggae</li>
<li><a class="mejs-smartplaylist-time">00:32:14</a> | <span>Les Aiglons de basse terre</span> - Chombo Merenge</li>
<li><a class="mejs-smartplaylist-time">00:36:34</a> | <span>Mighty Shadow</span> - Dat Soca Boat</li>
<li><a class="mejs-smartplaylist-time">00:38:48</a> | <span>Lemonade</span> - Lifted</li>
<li><a class="mejs-smartplaylist-time">00:41:14</a> | <a href="http://www.lasrubiasdelnorte.com">Las Rubias del Norte</a> - Porque Te Vas</li>
<li><a class="mejs-smartplaylist-time">00:45:11</a> | <a href="http://www.dickeldemasiado.com">Dick El Demasiado</a> - Pumpi Pumpi Pumpi</li>
<li><a class="mejs-smartplaylist-time">00:47:35</a> | <span>Piero Umiliani</span> - The Party</li>
<li><a class="mejs-smartplaylist-time">00:48:42</a> | <a href="http://www.naturalselfmusic.com">Peregoyo</a> - Caranito (Natural Self RMX)</li>
<li><a class="mejs-smartplaylist-time">00:52:35</a> | <a href="http://www.myspace.com/konononr1">Konono N1</a> - Guiyome</li>
<li><a class="mejs-smartplaylist-time">00:54:24</a> | <a href="http://www.myspace.com/delacasapropia">ESDLCP</a> - En la medida de lo posible</li>
</ol>
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

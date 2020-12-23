/**
 * Smart playlists
 * 
 * Links a timestamped playlist to player states.
 */
(function($) {

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

  $.extend(MediaElementPlayer.prototype, {
    buildsmartplaylist: function(player, controls, layers, media) {
      var $this = $(this)[0];
      var $playlist = $($this.options.smartplaylistSelectorPlaylist);
      var factors = $this.options.smartplaylistTimeFactors;

      // Analyze playlist timestamps
      $playlist.find($this.options.smartplaylistSelectorTimestamp).each(function() {
        // Convert to seconds
        var seconds = 0;
        var parts = this.text.match(new RegExp($this.options.smartplaylistTimestampRegex));
        seconds += parseInt(parts[1]) * factors['1'];
        seconds += parseInt(parts[2]) * factors['2'];
        seconds += parseInt(parts[3]) * factors['3'];
        $(this).attr('href', '?' + $this.options.smartplaylistPositionQueryVar + '=' + seconds);
        $(this).data('mejs-smartplaylist-seconds', seconds);
      });

      // Clicking on a timestamps seeks to the appropriate time in mix
      $playlist.find($this.options.smartplaylistSelectorTimestamp).on('click', function(event) {
        // Position player
        $playlist.find($this.options.smartplaylistSelectorTimestamp).removeClass($this.options.smartplaylistCurrentClass);
        $(this).addClass($this.options.smartplaylistCurrentClass);
        var player = mejs.players.mep_0;
        if (player.media.paused) {
          window.MejsSmartplaylistPosition = $(this).data('mejs-smartplaylist-seconds');
          mejs.players.mep_0.play(); 
        } else {
          player.setCurrentTime($(this).data('mejs-smartplaylist-seconds'));
        }

        // Update URL
        // Middle click, cmd click, and ctrl click should open
        // links in a new tab as normal.
        if (event.which > 1 || event.metaKey) {
          return;
        } else {
          window.location.href.replace($(this).attr('href'), '');
          window.history.pushState(null, '', $(this).attr('href'));
        }

        return false;
      });

      // Navigation history management
      $(window).bind('popstate', function(event) {
        var matches = location.href.match(/^.*position=(\d+)$/);
        if (matches != null) {
          var position = matches[1];
          var player = mejs.players.mep_0;
          if (player.media.paused) {
            window.MejsSmartplaylistPosition = position;
            mejs.players.mep_0.play();
          } else {
            player.setCurrentTime(position);
          }
        }
      });

      // Live updates
      media.addEventListener('timeupdate', function() {
        if (!media.paused) {
          // Update page title
          var currentTrack = $playlist.find('.' + $this.options.smartplaylistCurrentClass);
          var trackTitle = $this.options.smartplaylistPageTitleCallback(currentTrack); 
          if (trackTitle != false && trackTitle != undefined) {
            var title = $this.options.smartplaylistPageTitleFormat.replace(/(%timecode%)/, mejs.Utility.secondsToTimeCode(media.currentTime));
            title = title.replace(/(%title%)/, trackTitle);
            document.title = title;
          }
        }

        // Update current track on playlist
        var times = $($this.options.smartplaylistSelectorTimestamp);
        times.each(function(i) {
          // Boundaries
          var timeMin = parseInt($(this).data('mejs-smartplaylist-seconds'));
          var timeMax = $(times[i + 1]).data('mejs-smartplaylist-seconds');
          if (timeMax == undefined) {
            timeMax = 666666666666666; // L'infini, en moins glorieux
          }
          var timeCurrent = media.currentTime;

          // Test if track is within boundaries
          if (timeCurrent > timeMin && timeCurrent < timeMax) {
            $($this.options.smartplaylistSelectorTimestamp).removeClass($this.options.smartplaylistCurrentClass);
            $(this).addClass($this.options.smartplaylistCurrentClass);
          }
        });
      }, false);
    }
  });

})(mejs.$);

(function(){
    var script = {
 "children": [
  "this.MainViewer",
  "this.Container_EF8F8BD8_E386_8E03_41E3_4CF7CC1F4D8E",
  "this.Container_4041C033_7558_FB6E_41CE_BFE427F3AF92",
  "this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15",
  "this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7",
  "this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41",
  "this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E",
  "this.Container_1E18823C_57F1_802D_41C1_C325A6BB2CA9",
  "this.Image_D0039F75_DFE4_2586_41E7_57B2E7A03860"
 ],
 "id": "rootPlayer",
 "scrollBarMargin": 2,
 "layout": "absolute",
 "width": "100%",
 "start": "this.init(); this.syncPlaylists([this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist,this.mainPlayList])",
 "contentOpaque": false,
 "defaultVRPointer": "laser",
 "shadow": false,
 "verticalAlign": "top",
 "scripts": {
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "existsKey": function(key){  return key in window; },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "registerKey": function(key, value){  window[key] = value; },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "getKey": function(key){  return window[key]; },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "unregisterKey": function(key){  delete window[key]; },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } }
 },
 "downloadEnabled": false,
 "minHeight": 20,
 "class": "Player",
 "scrollBarWidth": 10,
 "paddingRight": 0,
 "minWidth": 20,
 "borderRadius": 0,
 "borderSize": 0,
 "definitions": [{
 "items": [
  {
   "media": "this.panorama_CAD34734_C7E2_EC0F_41B5_E0B45E9EFED8",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_CAD34734_C7E2_EC0F_41B5_E0B45E9EFED8_camera"
  },
  {
   "media": "this.panorama_C9FB1FD3_C7E2_1C09_41E6_42ADFD636671",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C9FB1FD3_C7E2_1C09_41E6_42ADFD636671_camera"
  },
  {
   "media": "this.panorama_C9650A57_C7E2_6409_41C0_63E9289A1D07",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C9650A57_C7E2_6409_41C0_63E9289A1D07_camera"
  },
  {
   "media": "this.panorama_C9D3C570_C7E2_2C08_41E7_5D5A13663395",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C9D3C570_C7E2_2C08_41E7_5D5A13663395_camera"
  },
  {
   "media": "this.panorama_C9824F8E_C7E3_FC1B_41E8_2523E26BFBC9",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C9824F8E_C7E3_FC1B_41E8_2523E26BFBC9_camera"
  },
  {
   "media": "this.panorama_C9974938_C7E2_2407_41D0_97F96CCF2173",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 5, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C9974938_C7E2_2407_41D0_97F96CCF2173_camera"
  }
 ],
 "id": "ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist",
 "class": "PlayList"
},
{
 "id": "camera_D321971A_C7E2_EC3B_41E6_9FB9FCE7F5D3",
 "initialPosition": {
  "yaw": -180,
  "class": "PanoramaCameraPosition",
  "pitch": -13.22
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "automaticZoomSpeed": 10
},
{
 "id": "camera_D572F79C_C7E2_EC3F_41DB_C9727207D654",
 "initialPosition": {
  "yaw": 92.57,
  "class": "PanoramaCameraPosition",
  "pitch": -6.61
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "automaticZoomSpeed": 10
},
{
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_CAD34734_C7E2_EC0F_41B5_E0B45E9EFED8_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "tags": "ondemand",
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_CAD34734_C7E2_EC0F_41B5_E0B45E9EFED8_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_CAD34734_C7E2_EC0F_41B5_E0B45E9EFED8_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CAD34734_C7E2_EC0F_41B5_E0B45E9EFED8_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_CAD34734_C7E2_EC0F_41B5_E0B45E9EFED8_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "tags": "ondemand",
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_CAD34734_C7E2_EC0F_41B5_E0B45E9EFED8_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_CAD34734_C7E2_EC0F_41B5_E0B45E9EFED8_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CAD34734_C7E2_EC0F_41B5_E0B45E9EFED8_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_CAD34734_C7E2_EC0F_41B5_E0B45E9EFED8_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "tags": "ondemand",
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_CAD34734_C7E2_EC0F_41B5_E0B45E9EFED8_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_CAD34734_C7E2_EC0F_41B5_E0B45E9EFED8_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CAD34734_C7E2_EC0F_41B5_E0B45E9EFED8_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_CAD34734_C7E2_EC0F_41B5_E0B45E9EFED8_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "tags": "ondemand",
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_CAD34734_C7E2_EC0F_41B5_E0B45E9EFED8_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_CAD34734_C7E2_EC0F_41B5_E0B45E9EFED8_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CAD34734_C7E2_EC0F_41B5_E0B45E9EFED8_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_CAD34734_C7E2_EC0F_41B5_E0B45E9EFED8_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "tags": "ondemand",
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_CAD34734_C7E2_EC0F_41B5_E0B45E9EFED8_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_CAD34734_C7E2_EC0F_41B5_E0B45E9EFED8_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CAD34734_C7E2_EC0F_41B5_E0B45E9EFED8_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_CAD34734_C7E2_EC0F_41B5_E0B45E9EFED8_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "tags": "ondemand",
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_CAD34734_C7E2_EC0F_41B5_E0B45E9EFED8_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_CAD34734_C7E2_EC0F_41B5_E0B45E9EFED8_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CAD34734_C7E2_EC0F_41B5_E0B45E9EFED8_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_CAD34734_C7E2_EC0F_41B5_E0B45E9EFED8_t.jpg"
  }
 ],
 "label": "Foto 01",
 "id": "panorama_CAD34734_C7E2_EC0F_41B5_E0B45E9EFED8",
 "overlays": [
  "this.overlay_D721E249_C7EE_2419_41E3_8A728F377B9E"
 ],
 "partial": false,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_C9FB1FD3_C7E2_1C09_41E6_42ADFD636671",
   "class": "AdjacentPanorama"
  }
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_CAD34734_C7E2_EC0F_41B5_E0B45E9EFED8_t.jpg",
 "pitch": 0,
 "hfovMin": "135%",
 "vfov": 180,
 "class": "Panorama",
 "hfovMax": 130
},
{
 "id": "camera_D367469F_C7E2_EC39_41E1_870C2BDF68F9",
 "initialPosition": {
  "yaw": -87.43,
  "class": "PanoramaCameraPosition",
  "pitch": 1.47
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "automaticZoomSpeed": 10
},
{
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_C9650A57_C7E2_6409_41C0_63E9289A1D07_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "tags": "ondemand",
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C9650A57_C7E2_6409_41C0_63E9289A1D07_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C9650A57_C7E2_6409_41C0_63E9289A1D07_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C9650A57_C7E2_6409_41C0_63E9289A1D07_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_C9650A57_C7E2_6409_41C0_63E9289A1D07_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "tags": "ondemand",
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C9650A57_C7E2_6409_41C0_63E9289A1D07_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C9650A57_C7E2_6409_41C0_63E9289A1D07_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C9650A57_C7E2_6409_41C0_63E9289A1D07_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_C9650A57_C7E2_6409_41C0_63E9289A1D07_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "tags": "ondemand",
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C9650A57_C7E2_6409_41C0_63E9289A1D07_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C9650A57_C7E2_6409_41C0_63E9289A1D07_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C9650A57_C7E2_6409_41C0_63E9289A1D07_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_C9650A57_C7E2_6409_41C0_63E9289A1D07_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "tags": "ondemand",
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C9650A57_C7E2_6409_41C0_63E9289A1D07_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C9650A57_C7E2_6409_41C0_63E9289A1D07_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C9650A57_C7E2_6409_41C0_63E9289A1D07_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_C9650A57_C7E2_6409_41C0_63E9289A1D07_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "tags": "ondemand",
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C9650A57_C7E2_6409_41C0_63E9289A1D07_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C9650A57_C7E2_6409_41C0_63E9289A1D07_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C9650A57_C7E2_6409_41C0_63E9289A1D07_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_C9650A57_C7E2_6409_41C0_63E9289A1D07_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "tags": "ondemand",
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C9650A57_C7E2_6409_41C0_63E9289A1D07_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C9650A57_C7E2_6409_41C0_63E9289A1D07_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C9650A57_C7E2_6409_41C0_63E9289A1D07_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_C9650A57_C7E2_6409_41C0_63E9289A1D07_t.jpg"
  }
 ],
 "label": "Foto 3",
 "id": "panorama_C9650A57_C7E2_6409_41C0_63E9289A1D07",
 "overlays": [
  "this.overlay_D5D7F102_C7EE_240B_41E5_32DD340FFF1A"
 ],
 "partial": false,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_C9FB1FD3_C7E2_1C09_41E6_42ADFD636671",
   "class": "AdjacentPanorama"
  }
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_C9650A57_C7E2_6409_41C0_63E9289A1D07_t.jpg",
 "pitch": 0,
 "hfovMin": "135%",
 "vfov": 180,
 "class": "Panorama",
 "hfovMax": 130
},
{
 "id": "panorama_C9824F8E_C7E3_FC1B_41E8_2523E26BFBC9_camera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "automaticZoomSpeed": 10
},
{
 "displayOriginPosition": {
  "yaw": 0,
  "hfov": 165,
  "class": "RotationalCameraDisplayPosition",
  "stereographicFactor": 1,
  "pitch": -90
 },
 "id": "panorama_CAD34734_C7E2_EC0F_41B5_E0B45E9EFED8_camera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "displayMovements": [
  {
   "easing": "linear",
   "duration": 1000,
   "class": "TargetRotationalCameraDisplayMovement"
  },
  {
   "easing": "cubic_in_out",
   "duration": 3000,
   "class": "TargetRotationalCameraDisplayMovement",
   "targetStereographicFactor": 0,
   "targetPitch": 0
  }
 ],
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "automaticZoomSpeed": 10
},
{
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_C9D3C570_C7E2_2C08_41E7_5D5A13663395_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "tags": "ondemand",
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C9D3C570_C7E2_2C08_41E7_5D5A13663395_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C9D3C570_C7E2_2C08_41E7_5D5A13663395_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C9D3C570_C7E2_2C08_41E7_5D5A13663395_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_C9D3C570_C7E2_2C08_41E7_5D5A13663395_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "tags": "ondemand",
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C9D3C570_C7E2_2C08_41E7_5D5A13663395_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C9D3C570_C7E2_2C08_41E7_5D5A13663395_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C9D3C570_C7E2_2C08_41E7_5D5A13663395_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_C9D3C570_C7E2_2C08_41E7_5D5A13663395_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "tags": "ondemand",
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C9D3C570_C7E2_2C08_41E7_5D5A13663395_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C9D3C570_C7E2_2C08_41E7_5D5A13663395_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C9D3C570_C7E2_2C08_41E7_5D5A13663395_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_C9D3C570_C7E2_2C08_41E7_5D5A13663395_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "tags": "ondemand",
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C9D3C570_C7E2_2C08_41E7_5D5A13663395_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C9D3C570_C7E2_2C08_41E7_5D5A13663395_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C9D3C570_C7E2_2C08_41E7_5D5A13663395_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_C9D3C570_C7E2_2C08_41E7_5D5A13663395_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "tags": "ondemand",
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C9D3C570_C7E2_2C08_41E7_5D5A13663395_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C9D3C570_C7E2_2C08_41E7_5D5A13663395_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C9D3C570_C7E2_2C08_41E7_5D5A13663395_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_C9D3C570_C7E2_2C08_41E7_5D5A13663395_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "tags": "ondemand",
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C9D3C570_C7E2_2C08_41E7_5D5A13663395_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C9D3C570_C7E2_2C08_41E7_5D5A13663395_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C9D3C570_C7E2_2C08_41E7_5D5A13663395_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_C9D3C570_C7E2_2C08_41E7_5D5A13663395_t.jpg"
  }
 ],
 "label": "Foto 4",
 "id": "panorama_C9D3C570_C7E2_2C08_41E7_5D5A13663395",
 "overlays": [
  "this.overlay_D5C36CBE_C7E2_1C7B_41C7_F60D5B46F2F5",
  "this.overlay_D711301E_C7E2_243B_41DF_FBC6AABF936B"
 ],
 "partial": false,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_C9824F8E_C7E3_FC1B_41E8_2523E26BFBC9",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_C9FB1FD3_C7E2_1C09_41E6_42ADFD636671",
   "class": "AdjacentPanorama"
  }
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_C9D3C570_C7E2_2C08_41E7_5D5A13663395_t.jpg",
 "pitch": 0,
 "hfovMin": "135%",
 "vfov": 180,
 "class": "Panorama",
 "hfovMax": 130
},
{
 "id": "panorama_C9FB1FD3_C7E2_1C09_41E6_42ADFD636671_camera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "automaticZoomSpeed": 10
},
{
 "id": "camera_D343C6D2_C7E2_EC0B_41CF_CF4CB8883DDC",
 "initialPosition": {
  "yaw": -180,
  "class": "PanoramaCameraPosition",
  "pitch": -2.2
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "automaticZoomSpeed": 10
},
{
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_C9824F8E_C7E3_FC1B_41E8_2523E26BFBC9_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "tags": "ondemand",
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C9824F8E_C7E3_FC1B_41E8_2523E26BFBC9_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C9824F8E_C7E3_FC1B_41E8_2523E26BFBC9_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C9824F8E_C7E3_FC1B_41E8_2523E26BFBC9_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_C9824F8E_C7E3_FC1B_41E8_2523E26BFBC9_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "tags": "ondemand",
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C9824F8E_C7E3_FC1B_41E8_2523E26BFBC9_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C9824F8E_C7E3_FC1B_41E8_2523E26BFBC9_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C9824F8E_C7E3_FC1B_41E8_2523E26BFBC9_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_C9824F8E_C7E3_FC1B_41E8_2523E26BFBC9_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "tags": "ondemand",
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C9824F8E_C7E3_FC1B_41E8_2523E26BFBC9_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C9824F8E_C7E3_FC1B_41E8_2523E26BFBC9_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C9824F8E_C7E3_FC1B_41E8_2523E26BFBC9_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_C9824F8E_C7E3_FC1B_41E8_2523E26BFBC9_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "tags": "ondemand",
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C9824F8E_C7E3_FC1B_41E8_2523E26BFBC9_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C9824F8E_C7E3_FC1B_41E8_2523E26BFBC9_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C9824F8E_C7E3_FC1B_41E8_2523E26BFBC9_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_C9824F8E_C7E3_FC1B_41E8_2523E26BFBC9_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "tags": "ondemand",
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C9824F8E_C7E3_FC1B_41E8_2523E26BFBC9_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C9824F8E_C7E3_FC1B_41E8_2523E26BFBC9_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C9824F8E_C7E3_FC1B_41E8_2523E26BFBC9_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_C9824F8E_C7E3_FC1B_41E8_2523E26BFBC9_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "tags": "ondemand",
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C9824F8E_C7E3_FC1B_41E8_2523E26BFBC9_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C9824F8E_C7E3_FC1B_41E8_2523E26BFBC9_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C9824F8E_C7E3_FC1B_41E8_2523E26BFBC9_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_C9824F8E_C7E3_FC1B_41E8_2523E26BFBC9_t.jpg"
  }
 ],
 "label": "Foto 5",
 "id": "panorama_C9824F8E_C7E3_FC1B_41E8_2523E26BFBC9",
 "overlays": [
  "this.overlay_D4F19234_C7E2_E40F_41CE_B750024B0C5D",
  "this.overlay_D6BAEF40_C7E2_1C07_41D0_FCFA8B70C107"
 ],
 "partial": false,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_C9D3C570_C7E2_2C08_41E7_5D5A13663395",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_C9974938_C7E2_2407_41D0_97F96CCF2173",
   "class": "AdjacentPanorama"
  }
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_C9824F8E_C7E3_FC1B_41E8_2523E26BFBC9_t.jpg",
 "pitch": 0,
 "hfovMin": "135%",
 "vfov": 180,
 "class": "Panorama",
 "hfovMax": 130
},
{
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_C9FB1FD3_C7E2_1C09_41E6_42ADFD636671_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "tags": "ondemand",
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C9FB1FD3_C7E2_1C09_41E6_42ADFD636671_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C9FB1FD3_C7E2_1C09_41E6_42ADFD636671_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C9FB1FD3_C7E2_1C09_41E6_42ADFD636671_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_C9FB1FD3_C7E2_1C09_41E6_42ADFD636671_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "tags": "ondemand",
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C9FB1FD3_C7E2_1C09_41E6_42ADFD636671_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C9FB1FD3_C7E2_1C09_41E6_42ADFD636671_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C9FB1FD3_C7E2_1C09_41E6_42ADFD636671_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_C9FB1FD3_C7E2_1C09_41E6_42ADFD636671_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "tags": "ondemand",
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C9FB1FD3_C7E2_1C09_41E6_42ADFD636671_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C9FB1FD3_C7E2_1C09_41E6_42ADFD636671_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C9FB1FD3_C7E2_1C09_41E6_42ADFD636671_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_C9FB1FD3_C7E2_1C09_41E6_42ADFD636671_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "tags": "ondemand",
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C9FB1FD3_C7E2_1C09_41E6_42ADFD636671_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C9FB1FD3_C7E2_1C09_41E6_42ADFD636671_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C9FB1FD3_C7E2_1C09_41E6_42ADFD636671_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_C9FB1FD3_C7E2_1C09_41E6_42ADFD636671_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "tags": "ondemand",
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C9FB1FD3_C7E2_1C09_41E6_42ADFD636671_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C9FB1FD3_C7E2_1C09_41E6_42ADFD636671_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C9FB1FD3_C7E2_1C09_41E6_42ADFD636671_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_C9FB1FD3_C7E2_1C09_41E6_42ADFD636671_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "tags": "ondemand",
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C9FB1FD3_C7E2_1C09_41E6_42ADFD636671_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C9FB1FD3_C7E2_1C09_41E6_42ADFD636671_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C9FB1FD3_C7E2_1C09_41E6_42ADFD636671_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_C9FB1FD3_C7E2_1C09_41E6_42ADFD636671_t.jpg"
  }
 ],
 "label": "Foto 2",
 "id": "panorama_C9FB1FD3_C7E2_1C09_41E6_42ADFD636671",
 "overlays": [
  "this.overlay_C8D3EDBA_C7EE_3C7B_4194_C013BEE06372",
  "this.overlay_D7C974BC_C7EE_6C7F_41A4_B254D5DB8D08",
  "this.overlay_D71772FB_C7EE_25F9_41DF_86A5F8E0A826"
 ],
 "partial": false,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_C9650A57_C7E2_6409_41C0_63E9289A1D07",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_C9D3C570_C7E2_2C08_41E7_5D5A13663395",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_CAD34734_C7E2_EC0F_41B5_E0B45E9EFED8",
   "class": "AdjacentPanorama"
  }
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_C9FB1FD3_C7E2_1C09_41E6_42ADFD636671_t.jpg",
 "pitch": 0,
 "hfovMin": "135%",
 "vfov": 180,
 "class": "Panorama",
 "hfovMax": 130
},
{
 "items": [
  {
   "media": "this.panorama_CAD34734_C7E2_EC0F_41B5_E0B45E9EFED8",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_CAD34734_C7E2_EC0F_41B5_E0B45E9EFED8_camera"
  },
  {
   "media": "this.panorama_C9FB1FD3_C7E2_1C09_41E6_42ADFD636671",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C9FB1FD3_C7E2_1C09_41E6_42ADFD636671_camera"
  },
  {
   "media": "this.panorama_C9650A57_C7E2_6409_41C0_63E9289A1D07",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C9650A57_C7E2_6409_41C0_63E9289A1D07_camera"
  },
  {
   "media": "this.panorama_C9D3C570_C7E2_2C08_41E7_5D5A13663395",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C9D3C570_C7E2_2C08_41E7_5D5A13663395_camera"
  },
  {
   "media": "this.panorama_C9824F8E_C7E3_FC1B_41E8_2523E26BFBC9",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C9824F8E_C7E3_FC1B_41E8_2523E26BFBC9_camera"
  },
  {
   "media": "this.panorama_C9974938_C7E2_2407_41D0_97F96CCF2173",
   "end": "this.trigger('tourEnded')",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 5, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C9974938_C7E2_2407_41D0_97F96CCF2173_camera"
  }
 ],
 "id": "mainPlayList",
 "class": "PlayList"
},
{
 "id": "camera_D33226F4_C7E2_EC08_41DB_F8ED1472C658",
 "initialPosition": {
  "yaw": -180,
  "class": "PanoramaCameraPosition",
  "pitch": -5.14
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "automaticZoomSpeed": 10
},
{
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_C9974938_C7E2_2407_41D0_97F96CCF2173_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "tags": "ondemand",
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C9974938_C7E2_2407_41D0_97F96CCF2173_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C9974938_C7E2_2407_41D0_97F96CCF2173_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C9974938_C7E2_2407_41D0_97F96CCF2173_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_C9974938_C7E2_2407_41D0_97F96CCF2173_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "tags": "ondemand",
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C9974938_C7E2_2407_41D0_97F96CCF2173_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C9974938_C7E2_2407_41D0_97F96CCF2173_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C9974938_C7E2_2407_41D0_97F96CCF2173_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_C9974938_C7E2_2407_41D0_97F96CCF2173_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "tags": "ondemand",
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C9974938_C7E2_2407_41D0_97F96CCF2173_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C9974938_C7E2_2407_41D0_97F96CCF2173_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C9974938_C7E2_2407_41D0_97F96CCF2173_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_C9974938_C7E2_2407_41D0_97F96CCF2173_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "tags": "ondemand",
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C9974938_C7E2_2407_41D0_97F96CCF2173_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C9974938_C7E2_2407_41D0_97F96CCF2173_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C9974938_C7E2_2407_41D0_97F96CCF2173_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_C9974938_C7E2_2407_41D0_97F96CCF2173_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "tags": "ondemand",
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C9974938_C7E2_2407_41D0_97F96CCF2173_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C9974938_C7E2_2407_41D0_97F96CCF2173_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C9974938_C7E2_2407_41D0_97F96CCF2173_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_C9974938_C7E2_2407_41D0_97F96CCF2173_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "tags": "ondemand",
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C9974938_C7E2_2407_41D0_97F96CCF2173_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C9974938_C7E2_2407_41D0_97F96CCF2173_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C9974938_C7E2_2407_41D0_97F96CCF2173_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_C9974938_C7E2_2407_41D0_97F96CCF2173_t.jpg"
  }
 ],
 "label": "Foto 6",
 "id": "panorama_C9974938_C7E2_2407_41D0_97F96CCF2173",
 "overlays": [
  "this.overlay_D4246D52_C7E6_7C0B_41DE_0EF8BC48EB36"
 ],
 "partial": false,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_C9824F8E_C7E3_FC1B_41E8_2523E26BFBC9",
   "class": "AdjacentPanorama"
  }
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_C9974938_C7E2_2407_41D0_97F96CCF2173_t.jpg",
 "pitch": 0,
 "hfovMin": "135%",
 "vfov": 180,
 "class": "Panorama",
 "hfovMax": 130
},
{
 "id": "panorama_C9974938_C7E2_2407_41D0_97F96CCF2173_camera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "automaticZoomSpeed": 10
},
{
 "id": "panorama_C9D3C570_C7E2_2C08_41E7_5D5A13663395_camera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "automaticZoomSpeed": 10
},
{
 "id": "camera_D355D6B7_C7E2_EC09_41D0_1F65356A2B44",
 "initialPosition": {
  "yaw": 90.37,
  "class": "PanoramaCameraPosition",
  "pitch": -5.14
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "automaticZoomSpeed": 10
},
{
 "id": "panorama_C9650A57_C7E2_6409_41C0_63E9289A1D07_camera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "automaticZoomSpeed": 10
},
{
 "viewerArea": "this.MainViewer",
 "class": "PanoramaPlayer",
 "touchControlMode": "drag_rotation",
 "gyroscopeVerticalDraggingEnabled": true,
 "id": "MainViewerPanoramaPlayer",
 "displayPlaybackBar": true,
 "mouseControlMode": "drag_rotation"
},
{
 "id": "camera_D576E7BC_C7E2_EC7F_4191_571350D81118",
 "initialPosition": {
  "yaw": -88.16,
  "class": "PanoramaCameraPosition",
  "pitch": 1.47
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "automaticZoomSpeed": 10
},
{
 "playbackBarHeight": 10,
 "toolTipFontSize": 13,
 "id": "MainViewer",
 "left": 0,
 "playbackBarBackgroundColorDirection": "vertical",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "toolTipTextShadowColor": "#000000",
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 7,
 "toolTipFontWeight": "normal",
 "playbackBarRight": 0,
 "right": "0.21%",
 "progressBarBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "playbackBarProgressBorderSize": 0,
 "minHeight": 50,
 "playbackBarHeadShadowVerticalLength": 0,
 "class": "ViewerArea",
 "playbackBarBorderRadius": 0,
 "transitionDuration": 500,
 "paddingRight": 0,
 "playbackBarProgressBorderColor": "#000000",
 "minWidth": 100,
 "toolTipFontStyle": "normal",
 "toolTipShadowOpacity": 0,
 "borderSize": 0,
 "progressLeft": 0,
 "playbackBarHeadBorderColor": "#000000",
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "playbackBarHeadBorderRadius": 0,
 "propagateClick": true,
 "toolTipTextShadowOpacity": 0,
 "vrPointerSelectionColor": "#FF6600",
 "toolTipFontFamily": "Georgia",
 "playbackBarBorderSize": 0,
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressBarBackgroundColorDirection": "vertical",
 "progressBottom": 0,
 "paddingLeft": 0,
 "toolTipBackgroundColor": "#000000",
 "toolTipFontColor": "#FFFFFF",
 "progressHeight": 10,
 "playbackBarHeadShadow": true,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "playbackBarHeadShadowHorizontalLength": 0,
 "displayTooltipInTouchScreens": true,
 "playbackBarHeadShadowOpacity": 0.7,
 "vrPointerColor": "#FFFFFF",
 "transitionMode": "blending",
 "shadow": false,
 "progressBarOpacity": 1,
 "playbackBarBorderColor": "#FFFFFF",
 "toolTipBorderSize": 1,
 "toolTipPaddingRight": 10,
 "progressBorderSize": 0,
 "toolTipPaddingLeft": 10,
 "toolTipPaddingTop": 7,
 "bottom": "0.24%",
 "progressBorderRadius": 0,
 "top": 0,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "toolTipDisplayTime": 600,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarLeft": 0,
 "paddingBottom": 0,
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBarBorderColor": "#0066FF",
 "paddingTop": 0,
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarHeadOpacity": 1,
 "playbackBarBottom": 5,
 "progressBackgroundColorDirection": "vertical",
 "toolTipShadowSpread": 0,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipBorderColor": "#767676",
 "progressBorderColor": "#FFFFFF",
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "data": {
  "name": "Main Viewer"
 },
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "toolTipShadowBlurRadius": 3,
 "toolTipOpacity": 0.5
},
{
 "children": [
  "this.Container_EF8F8BD8_E386_8E02_41E5_FC5C5513733A"
 ],
 "id": "Container_EF8F8BD8_E386_8E03_41E3_4CF7CC1F4D8E",
 "scrollBarMargin": 2,
 "layout": "absolute",
 "width": 115.05,
 "contentOpaque": false,
 "right": "0%",
 "shadow": false,
 "verticalAlign": "top",
 "minHeight": 1,
 "class": "Container",
 "scrollBarWidth": 10,
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "top": "0%",
 "gap": 10,
 "paddingTop": 0,
 "propagateClick": true,
 "height": 641,
 "scrollBarColor": "#000000",
 "data": {
  "name": "-- SETTINGS"
 },
 "scrollBarOpacity": 0.5,
 "horizontalAlign": "left",
 "scrollBarVisible": "rollOver",
 "overflow": "scroll",
 "paddingLeft": 0
},
{
 "children": [
  "this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4",
  "this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD"
 ],
 "id": "Container_4041C033_7558_FB6E_41CE_BFE427F3AF92",
 "left": "0%",
 "scrollBarMargin": 2,
 "layout": "absolute",
 "width": 330,
 "contentOpaque": false,
 "shadow": false,
 "verticalAlign": "top",
 "minHeight": 1,
 "class": "Container",
 "scrollBarWidth": 10,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "top": "0%",
 "borderSize": 0,
 "paddingBottom": 0,
 "gap": 10,
 "paddingTop": 0,
 "propagateClick": false,
 "paddingRight": 0,
 "scrollBarColor": "#000000",
 "data": {
  "name": "--- LEFT PANEL 4 (Community)"
 },
 "height": "100%",
 "scrollBarOpacity": 0.5,
 "horizontalAlign": "left",
 "scrollBarVisible": "rollOver",
 "overflow": "scroll",
 "paddingLeft": 0
},
{
 "children": [
  "this.Container_39A197B1_0C06_62AF_419A_D15E4DDD2528"
 ],
 "id": "Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15",
 "left": "0%",
 "scrollBarMargin": 2,
 "layout": "absolute",
 "contentOpaque": false,
 "shadow": false,
 "verticalAlign": "top",
 "right": "0%",
 "minHeight": 1,
 "class": "Container",
 "scrollBarWidth": 10,
 "bottom": "0%",
 "paddingRight": 0,
 "backgroundOpacity": 0.6,
 "minWidth": 1,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "top": "0%",
 "creationPolicy": "inAdvance",
 "borderSize": 0,
 "borderRadius": 0,
 "paddingBottom": 0,
 "paddingTop": 0,
 "propagateClick": true,
 "gap": 10,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarColor": "#000000",
 "click": "this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, false, 0, null, null, false)",
 "data": {
  "name": "--PANORAMA LIST"
 },
 "scrollBarOpacity": 0.5,
 "visible": false,
 "horizontalAlign": "left",
 "scrollBarVisible": "rollOver",
 "overflow": "scroll",
 "backgroundColorDirection": "vertical",
 "paddingLeft": 0
},
{
 "children": [
  "this.Container_221C1648_0C06_E5FD_4180_8A2E8B66315E",
  "this.Container_221B3648_0C06_E5FD_4199_FCE031AE003B"
 ],
 "id": "Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7",
 "left": "0%",
 "scrollBarMargin": 2,
 "layout": "absolute",
 "contentOpaque": false,
 "shadow": false,
 "verticalAlign": "top",
 "right": "0%",
 "minHeight": 1,
 "class": "Container",
 "scrollBarWidth": 10,
 "bottom": "0%",
 "paddingRight": 0,
 "backgroundOpacity": 0.6,
 "minWidth": 1,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "top": "0%",
 "creationPolicy": "inAdvance",
 "borderSize": 0,
 "borderRadius": 0,
 "paddingBottom": 0,
 "paddingTop": 0,
 "propagateClick": true,
 "gap": 10,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarColor": "#000000",
 "click": "this.setComponentVisibility(this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7, false, 0, null, null, false)",
 "data": {
  "name": "--LOCATION"
 },
 "scrollBarOpacity": 0.5,
 "visible": false,
 "horizontalAlign": "left",
 "scrollBarVisible": "rollOver",
 "overflow": "scroll",
 "backgroundColorDirection": "vertical",
 "paddingLeft": 0
},
{
 "children": [
  "this.Container_2F8A6686_0D4F_6B71_4174_A02FE43588D3"
 ],
 "id": "Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41",
 "left": "0%",
 "scrollBarMargin": 2,
 "layout": "absolute",
 "contentOpaque": false,
 "shadow": false,
 "verticalAlign": "top",
 "right": "0%",
 "minHeight": 1,
 "class": "Container",
 "scrollBarWidth": 10,
 "bottom": "0%",
 "paddingRight": 0,
 "backgroundOpacity": 0.6,
 "minWidth": 1,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "top": "0%",
 "creationPolicy": "inAdvance",
 "borderSize": 0,
 "borderRadius": 0,
 "paddingBottom": 0,
 "paddingTop": 0,
 "propagateClick": true,
 "gap": 10,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarColor": "#000000",
 "click": "this.setComponentVisibility(this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41, false, 0, null, null, false)",
 "data": {
  "name": "--FLOORPLAN"
 },
 "scrollBarOpacity": 0.5,
 "visible": false,
 "horizontalAlign": "left",
 "scrollBarVisible": "rollOver",
 "overflow": "scroll",
 "backgroundColorDirection": "vertical",
 "paddingLeft": 0
},
{
 "children": [
  "this.Container_2A193C4C_0D3B_DFF0_4161_A2CD128EF536"
 ],
 "id": "Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E",
 "left": "0%",
 "scrollBarMargin": 2,
 "layout": "absolute",
 "contentOpaque": false,
 "shadow": false,
 "verticalAlign": "top",
 "right": "0%",
 "minHeight": 1,
 "class": "Container",
 "scrollBarWidth": 10,
 "bottom": "0%",
 "paddingRight": 0,
 "backgroundOpacity": 0.6,
 "minWidth": 1,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "top": "0%",
 "creationPolicy": "inAdvance",
 "borderSize": 0,
 "borderRadius": 0,
 "paddingBottom": 0,
 "paddingTop": 0,
 "propagateClick": true,
 "gap": 10,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarColor": "#000000",
 "click": "this.setComponentVisibility(this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E, false, 0, null, null, false)",
 "data": {
  "name": "--PHOTOALBUM"
 },
 "scrollBarOpacity": 0.5,
 "visible": false,
 "horizontalAlign": "left",
 "scrollBarVisible": "rollOver",
 "overflow": "scroll",
 "backgroundColorDirection": "vertical",
 "paddingLeft": 0
},
{
 "children": [
  "this.Container_1E19923C_57F1_802D_41C4_18DBE75E48C1",
  "this.Container_1E18A23C_57F1_802D_41B9_D08FA26C7F4C"
 ],
 "id": "Container_1E18823C_57F1_802D_41C1_C325A6BB2CA9",
 "left": "0%",
 "scrollBarMargin": 2,
 "layout": "absolute",
 "contentOpaque": false,
 "shadow": false,
 "verticalAlign": "top",
 "right": "0%",
 "minHeight": 1,
 "class": "Container",
 "scrollBarWidth": 10,
 "bottom": "0%",
 "paddingRight": 0,
 "backgroundOpacity": 0.6,
 "minWidth": 1,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "top": "0%",
 "creationPolicy": "inAdvance",
 "borderSize": 0,
 "borderRadius": 0,
 "paddingBottom": 0,
 "paddingTop": 0,
 "propagateClick": true,
 "gap": 10,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarColor": "#04A3E1",
 "click": "this.setComponentVisibility(this.Container_1E18823C_57F1_802D_41C1_C325A6BB2CA9, false, 0, null, null, false)",
 "data": {
  "name": "--REALTOR"
 },
 "scrollBarOpacity": 0.5,
 "visible": false,
 "horizontalAlign": "left",
 "scrollBarVisible": "rollOver",
 "overflow": "scroll",
 "backgroundColorDirection": "vertical",
 "paddingLeft": 0
},
{
 "maxHeight": 468,
 "maxWidth": 1283,
 "id": "Image_D0039F75_DFE4_2586_41E7_57B2E7A03860",
 "width": 205.28,
 "right": "1.45%",
 "shadow": false,
 "verticalAlign": "middle",
 "url": "skin/Image_D0039F75_DFE4_2586_41E7_57B2E7A03860.png",
 "minHeight": 1,
 "class": "Image",
 "top": "0%",
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "bottom": "81.86%",
 "borderSize": 0,
 "paddingBottom": 0,
 "paddingTop": 0,
 "propagateClick": false,
 "paddingRight": 0,
 "scaleMode": "fit_inside",
 "data": {
  "name": "Image4030"
 },
 "horizontalAlign": "center",
 "paddingLeft": 0
},
{
 "enabledInCardboard": true,
 "maps": [
  {
   "hfov": 31.47,
   "yaw": -2.52,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_CAD34734_C7E2_EC0F_41B5_E0B45E9EFED8_1_HS_0_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -23.8
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D15D035E_C7E2_243B_41E5_BB6F2361A0D4",
   "hfov": 31.47,
   "pitch": -23.8,
   "yaw": -2.52,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_D721E249_C7EE_2419_41E3_8A728F377B9E",
 "data": {
  "label": "Arrow 05b"
 }
},
{
 "enabledInCardboard": true,
 "maps": [
  {
   "hfov": 31.22,
   "yaw": -179.96,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_C9650A57_C7E2_6409_41C0_63E9289A1D07_1_HS_0_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -24.83
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C9FB1FD3_C7E2_1C09_41E6_42ADFD636671, this.camera_D321971A_C7E2_EC3B_41E6_9FB9FCE7F5D3); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D15C8364_C7E2_240F_41C4_A9E2E8EE246E",
   "hfov": 31.22,
   "pitch": -24.83,
   "yaw": -179.96,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_D5D7F102_C7EE_240B_41E5_32DD340FFF1A",
 "data": {
  "label": "Arrow 05b"
 }
},
{
 "enabledInCardboard": true,
 "maps": [
  {
   "hfov": 30.39,
   "yaw": -90.37,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_C9D3C570_C7E2_2C08_41E7_5D5A13663395_1_HS_0_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -27.92
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C9FB1FD3_C7E2_1C09_41E6_42ADFD636671, this.camera_D576E7BC_C7E2_EC7F_4191_571350D81118); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D15CD364_C7E2_240F_41DE_3E66CE7BCC9C",
   "hfov": 30.39,
   "pitch": -27.92,
   "yaw": -90.37,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_D5C36CBE_C7E2_1C7B_41C7_F60D5B46F2F5",
 "data": {
  "label": "Arrow 05b"
 }
},
{
 "enabledInCardboard": true,
 "maps": [
  {
   "hfov": 30.1,
   "yaw": 90.83,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_C9D3C570_C7E2_2C08_41E7_5D5A13663395_1_HS_1_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -28.95
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C9824F8E_C7E3_FC1B_41E8_2523E26BFBC9, this.camera_D572F79C_C7E2_EC3F_41DB_C9727207D654); this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D15F6365_C7E2_2409_41E1_EE18552CFD17",
   "hfov": 30.1,
   "pitch": -28.95,
   "yaw": 90.83,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_D711301E_C7E2_243B_41DF_FBC6AABF936B",
 "data": {
  "label": "Arrow 05b"
 }
},
{
 "enabledInCardboard": true,
 "maps": [
  {
   "hfov": 30.77,
   "yaw": -90.72,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_C9824F8E_C7E3_FC1B_41E8_2523E26BFBC9_1_HS_0_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -26.55
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C9D3C570_C7E2_2C08_41E7_5D5A13663395, this.camera_D367469F_C7E2_EC39_41E1_870C2BDF68F9); this.mainPlayList.set('selectedIndex', 3)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D15F9366_C7E2_240B_41D1_9C59E5D5E1B4",
   "hfov": 30.77,
   "pitch": -26.55,
   "yaw": -90.72,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_D4F19234_C7E2_E40F_41CE_B750024B0C5D",
 "data": {
  "label": "Arrow 05b"
 }
},
{
 "enabledInCardboard": true,
 "maps": [
  {
   "hfov": 29.38,
   "yaw": 0.23,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_C9824F8E_C7E3_FC1B_41E8_2523E26BFBC9_1_HS_1_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -31.35
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D15E3366_C7E2_240B_41D3_62774A101B1C",
   "hfov": 29.38,
   "pitch": -31.35,
   "yaw": 0.23,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_D6BAEF40_C7E2_1C07_41D0_FCFA8B70C107",
 "data": {
  "label": "Arrow 05b"
 }
},
{
 "enabledInCardboard": true,
 "maps": [
  {
   "hfov": 31.47,
   "yaw": -2.52,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_C9FB1FD3_C7E2_1C09_41E6_42ADFD636671_1_HS_0_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -23.8
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D15D9361_C7E2_2409_41D3_5CAED4D973B7",
   "hfov": 31.47,
   "pitch": -23.8,
   "yaw": -2.52,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_C8D3EDBA_C7EE_3C7B_4194_C013BEE06372",
 "data": {
  "label": "Arrow 05b"
 }
},
{
 "enabledInCardboard": true,
 "maps": [
  {
   "hfov": 30.58,
   "yaw": 91.51,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_C9FB1FD3_C7E2_1C09_41E6_42ADFD636671_1_HS_1_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -27.23
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C9D3C570_C7E2_2C08_41E7_5D5A13663395, this.camera_D355D6B7_C7E2_EC09_41D0_1F65356A2B44); this.mainPlayList.set('selectedIndex', 3)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D15C3362_C7E2_240B_41D4_33852732CE55",
   "hfov": 30.58,
   "pitch": -27.23,
   "yaw": 91.51,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_D7C974BC_C7EE_6C7F_41A4_B254D5DB8D08",
 "data": {
  "label": "Arrow 05b"
 }
},
{
 "enabledInCardboard": true,
 "maps": [
  {
   "hfov": 31.04,
   "yaw": -179.6,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_C9FB1FD3_C7E2_1C09_41E6_42ADFD636671_1_HS_2_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -25.52
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CAD34734_C7E2_EC0F_41B5_E0B45E9EFED8, this.camera_D343C6D2_C7E2_EC0B_41CF_CF4CB8883DDC); this.mainPlayList.set('selectedIndex', 0)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D15C7363_C7E2_2409_41DC_29D318ED94F0",
   "hfov": 31.04,
   "pitch": -25.52,
   "yaw": -179.6,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_D71772FB_C7EE_25F9_41DF_86A5F8E0A826",
 "data": {
  "label": "Arrow 05b"
 }
},
{
 "enabledInCardboard": true,
 "maps": [
  {
   "hfov": 27.89,
   "yaw": -178.57,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_C9974938_C7E2_2407_41D0_97F96CCF2173_1_HS_0_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -35.81
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C9824F8E_C7E3_FC1B_41E8_2523E26BFBC9, this.camera_D33226F4_C7E2_EC08_41DB_F8ED1472C658); this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D15E6367_C7E2_2409_41D8_AAADC8F90341",
   "hfov": 27.89,
   "pitch": -35.81,
   "yaw": -178.57,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_D4246D52_C7E6_7C0B_41DE_0EF8BC48EB36",
 "data": {
  "label": "Arrow 05b"
 }
},
{
 "id": "Container_EF8F8BD8_E386_8E02_41E5_FC5C5513733A",
 "scrollBarMargin": 2,
 "layout": "horizontal",
 "width": 110,
 "contentOpaque": false,
 "right": "0%",
 "shadow": false,
 "verticalAlign": "middle",
 "minHeight": 1,
 "class": "Container",
 "scrollBarWidth": 10,
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "top": "0%",
 "gap": 10,
 "paddingTop": 0,
 "propagateClick": true,
 "height": 110,
 "scrollBarColor": "#000000",
 "data": {
  "name": "button menu sup"
 },
 "scrollBarOpacity": 0.5,
 "horizontalAlign": "center",
 "scrollBarVisible": "rollOver",
 "overflow": "visible",
 "paddingLeft": 0
},
{
 "children": [
  "this.Container_21F34780_3014_BF93_41A2_9BF700588BEC",
  "this.IconButton_223F0171_3014_B375_41C1_61063C3D73B3"
 ],
 "id": "Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4",
 "left": "0%",
 "scrollBarMargin": 2,
 "layout": "absolute",
 "width": 66,
 "contentOpaque": false,
 "shadow": false,
 "verticalAlign": "top",
 "minHeight": 1,
 "class": "Container",
 "scrollBarWidth": 10,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "top": "0%",
 "borderSize": 0,
 "paddingBottom": 0,
 "gap": 10,
 "paddingTop": 0,
 "propagateClick": true,
 "paddingRight": 0,
 "scrollBarColor": "#000000",
 "data": {
  "name": "- COLLAPSE"
 },
 "height": "100%",
 "scrollBarOpacity": 0.5,
 "horizontalAlign": "left",
 "scrollBarVisible": "rollOver",
 "overflow": "scroll",
 "paddingLeft": 0
},
{
 "children": [
  "this.Container_4521E58D_74A8_853A_418A_CF7FF914DD83",
  "this.IconButton_1AF35943_2D07_479B_41AF_FBC8A1477882"
 ],
 "id": "Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD",
 "scrollBarMargin": 2,
 "layout": "absolute",
 "width": 330,
 "contentOpaque": false,
 "right": 0,
 "shadow": false,
 "verticalAlign": "top",
 "minHeight": 1,
 "class": "Container",
 "scrollBarWidth": 10,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "top": "0%",
 "borderSize": 0,
 "paddingBottom": 0,
 "gap": 10,
 "paddingTop": 0,
 "propagateClick": false,
 "paddingRight": 0,
 "scrollBarColor": "#000000",
 "data": {
  "name": "- EXPANDED"
 },
 "height": "100%",
 "scrollBarOpacity": 0.5,
 "horizontalAlign": "left",
 "scrollBarVisible": "rollOver",
 "overflow": "visible",
 "paddingLeft": 0
},
{
 "children": [
  "this.Container_3A67552A_0C3A_67BD_4195_ECE46CCB34EA",
  "this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0"
 ],
 "id": "Container_39A197B1_0C06_62AF_419A_D15E4DDD2528",
 "left": "15%",
 "scrollBarMargin": 2,
 "layout": "absolute",
 "shadowColor": "#000000",
 "shadowVerticalLength": 0,
 "contentOpaque": false,
 "right": "15%",
 "shadow": true,
 "shadowBlurRadius": 25,
 "shadowSpread": 1,
 "verticalAlign": "top",
 "class": "Container",
 "scrollBarWidth": 10,
 "shadowOpacity": 0.3,
 "paddingRight": 0,
 "backgroundOpacity": 1,
 "minWidth": 1,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "top": "10%",
 "bottom": "10%",
 "borderSize": 0,
 "borderRadius": 0,
 "paddingBottom": 0,
 "gap": 10,
 "paddingTop": 0,
 "propagateClick": true,
 "minHeight": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarColor": "#000000",
 "shadowHorizontalLength": 0,
 "data": {
  "name": "Global"
 },
 "scrollBarOpacity": 0.5,
 "horizontalAlign": "center",
 "scrollBarVisible": "rollOver",
 "overflow": "visible",
 "backgroundColorDirection": "vertical",
 "paddingLeft": 0
},
{
 "children": [
  "this.WebFrame_22F9EEFF_0C1A_2293_4165_411D4444EFEA"
 ],
 "id": "Container_221C1648_0C06_E5FD_4180_8A2E8B66315E",
 "left": "15%",
 "scrollBarMargin": 2,
 "layout": "horizontal",
 "shadowColor": "#000000",
 "shadowVerticalLength": 0,
 "contentOpaque": false,
 "right": "15%",
 "shadow": true,
 "shadowBlurRadius": 25,
 "minHeight": 1,
 "verticalAlign": "top",
 "shadowSpread": 1,
 "class": "Container",
 "scrollBarWidth": 10,
 "shadowOpacity": 0.3,
 "paddingRight": 0,
 "backgroundOpacity": 1,
 "minWidth": 1,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "top": "10%",
 "bottom": "10%",
 "borderSize": 0,
 "borderRadius": 0,
 "paddingBottom": 0,
 "gap": 10,
 "paddingTop": 0,
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarColor": "#000000",
 "shadowHorizontalLength": 0,
 "data": {
  "name": "Global"
 },
 "scrollBarOpacity": 0.5,
 "visible": false,
 "horizontalAlign": "left",
 "scrollBarVisible": "rollOver",
 "overflow": "scroll",
 "backgroundColorDirection": "vertical",
 "paddingLeft": 0
},
{
 "id": "Container_221B3648_0C06_E5FD_4199_FCE031AE003B",
 "left": "15%",
 "scrollBarMargin": 2,
 "layout": "vertical",
 "contentOpaque": false,
 "right": "15%",
 "shadow": false,
 "verticalAlign": "top",
 "minHeight": 1,
 "class": "Container",
 "scrollBarWidth": 10,
 "top": "10%",
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "bottom": "80%",
 "borderSize": 0,
 "paddingBottom": 0,
 "gap": 10,
 "paddingTop": 20,
 "propagateClick": true,
 "paddingRight": 20,
 "scrollBarColor": "#000000",
 "data": {
  "name": "Container X global"
 },
 "scrollBarOpacity": 0.5,
 "visible": false,
 "horizontalAlign": "right",
 "scrollBarVisible": "rollOver",
 "overflow": "visible",
 "paddingLeft": 0
},
{
 "children": [
  "this.MapViewer",
  "this.Container_2F8A7686_0D4F_6B71_41A9_1A894413085C"
 ],
 "id": "Container_2F8A6686_0D4F_6B71_4174_A02FE43588D3",
 "left": "15%",
 "scrollBarMargin": 2,
 "layout": "absolute",
 "shadowColor": "#000000",
 "shadowVerticalLength": 0,
 "contentOpaque": false,
 "right": "15%",
 "shadow": true,
 "shadowBlurRadius": 25,
 "shadowSpread": 1,
 "verticalAlign": "top",
 "class": "Container",
 "scrollBarWidth": 10,
 "shadowOpacity": 0.3,
 "paddingRight": 0,
 "backgroundOpacity": 1,
 "minWidth": 1,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "top": "10%",
 "bottom": "10%",
 "borderSize": 0,
 "borderRadius": 0,
 "paddingBottom": 0,
 "gap": 10,
 "paddingTop": 0,
 "propagateClick": true,
 "minHeight": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarColor": "#000000",
 "shadowHorizontalLength": 0,
 "data": {
  "name": "Global"
 },
 "scrollBarOpacity": 0.5,
 "horizontalAlign": "center",
 "scrollBarVisible": "rollOver",
 "overflow": "visible",
 "backgroundColorDirection": "vertical",
 "paddingLeft": 0
},
{
 "children": [
  "this.Container_2A19EC4C_0D3B_DFF0_414D_37145C22C5BC"
 ],
 "id": "Container_2A193C4C_0D3B_DFF0_4161_A2CD128EF536",
 "left": "15%",
 "scrollBarMargin": 2,
 "layout": "vertical",
 "shadowColor": "#000000",
 "shadowVerticalLength": 0,
 "contentOpaque": false,
 "right": "15%",
 "shadow": true,
 "shadowBlurRadius": 25,
 "shadowSpread": 1,
 "verticalAlign": "top",
 "class": "Container",
 "scrollBarWidth": 10,
 "shadowOpacity": 0.3,
 "paddingRight": 0,
 "backgroundOpacity": 1,
 "minWidth": 1,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "top": "10%",
 "bottom": "10%",
 "borderSize": 0,
 "borderRadius": 0,
 "paddingBottom": 0,
 "gap": 10,
 "paddingTop": 0,
 "propagateClick": true,
 "minHeight": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarColor": "#000000",
 "shadowHorizontalLength": 0,
 "data": {
  "name": "Global"
 },
 "scrollBarOpacity": 0.5,
 "horizontalAlign": "center",
 "scrollBarVisible": "rollOver",
 "overflow": "visible",
 "backgroundColorDirection": "vertical",
 "paddingLeft": 0
},
{
 "children": [
  "this.Container_1E19E23C_57F1_802D_41D1_9B8B4D1D2BBD",
  "this.Container_1E19D23C_57F1_802D_41B0_92437DF80B82"
 ],
 "id": "Container_1E19923C_57F1_802D_41C4_18DBE75E48C1",
 "left": "15%",
 "scrollBarMargin": 2,
 "layout": "horizontal",
 "shadowColor": "#000000",
 "shadowVerticalLength": 0,
 "contentOpaque": false,
 "right": "15%",
 "shadow": true,
 "shadowBlurRadius": 25,
 "shadowSpread": 1,
 "verticalAlign": "top",
 "class": "Container",
 "scrollBarWidth": 10,
 "shadowOpacity": 0.3,
 "paddingRight": 0,
 "backgroundOpacity": 1,
 "minWidth": 1,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "top": "10%",
 "bottom": "10%",
 "borderSize": 0,
 "borderRadius": 0,
 "paddingBottom": 0,
 "gap": 10,
 "paddingTop": 0,
 "propagateClick": false,
 "minHeight": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarColor": "#000000",
 "shadowHorizontalLength": 0,
 "data": {
  "name": "Global"
 },
 "scrollBarOpacity": 0.5,
 "horizontalAlign": "left",
 "scrollBarVisible": "rollOver",
 "overflow": "scroll",
 "backgroundColorDirection": "vertical",
 "paddingLeft": 0
},
{
 "children": [
  "this.IconButton_1E18B23C_57F1_802D_41C8_61C0F9BCC1FF"
 ],
 "id": "Container_1E18A23C_57F1_802D_41B9_D08FA26C7F4C",
 "left": "15%",
 "scrollBarMargin": 2,
 "layout": "vertical",
 "contentOpaque": false,
 "right": "15%",
 "shadow": false,
 "verticalAlign": "top",
 "minHeight": 1,
 "class": "Container",
 "scrollBarWidth": 10,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "top": "10%",
 "bottom": "80%",
 "borderSize": 0,
 "paddingBottom": 0,
 "gap": 10,
 "paddingTop": 20,
 "propagateClick": false,
 "paddingRight": 20,
 "scrollBarColor": "#000000",
 "data": {
  "name": "Container X global"
 },
 "scrollBarOpacity": 0.5,
 "horizontalAlign": "right",
 "scrollBarVisible": "rollOver",
 "overflow": "visible",
 "paddingLeft": 0
},
{
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_CAD34734_C7E2_EC0F_41B5_E0B45E9EFED8_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ],
 "id": "AnimatedImageResource_D15D035E_C7E2_243B_41E5_BB6F2361A0D4",
 "rowCount": 6,
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C9650A57_C7E2_6409_41C0_63E9289A1D07_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ],
 "id": "AnimatedImageResource_D15C8364_C7E2_240F_41C4_A9E2E8EE246E",
 "rowCount": 6,
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C9D3C570_C7E2_2C08_41E7_5D5A13663395_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ],
 "id": "AnimatedImageResource_D15CD364_C7E2_240F_41DE_3E66CE7BCC9C",
 "rowCount": 6,
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C9D3C570_C7E2_2C08_41E7_5D5A13663395_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ],
 "id": "AnimatedImageResource_D15F6365_C7E2_2409_41E1_EE18552CFD17",
 "rowCount": 6,
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C9824F8E_C7E3_FC1B_41E8_2523E26BFBC9_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ],
 "id": "AnimatedImageResource_D15F9366_C7E2_240B_41D1_9C59E5D5E1B4",
 "rowCount": 6,
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C9824F8E_C7E3_FC1B_41E8_2523E26BFBC9_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ],
 "id": "AnimatedImageResource_D15E3366_C7E2_240B_41D3_62774A101B1C",
 "rowCount": 6,
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C9FB1FD3_C7E2_1C09_41E6_42ADFD636671_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ],
 "id": "AnimatedImageResource_D15D9361_C7E2_2409_41D3_5CAED4D973B7",
 "rowCount": 6,
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C9FB1FD3_C7E2_1C09_41E6_42ADFD636671_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ],
 "id": "AnimatedImageResource_D15C3362_C7E2_240B_41D4_33852732CE55",
 "rowCount": 6,
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C9FB1FD3_C7E2_1C09_41E6_42ADFD636671_1_HS_2_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ],
 "id": "AnimatedImageResource_D15C7363_C7E2_2409_41DC_29D318ED94F0",
 "rowCount": 6,
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C9974938_C7E2_2407_41D0_97F96CCF2173_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ],
 "id": "AnimatedImageResource_D15E6367_C7E2_2409_41D8_AAADC8F90341",
 "rowCount": 6,
 "colCount": 4
},
{
 "id": "Container_21F34780_3014_BF93_41A2_9BF700588BEC",
 "left": "0%",
 "scrollBarMargin": 2,
 "layout": "absolute",
 "width": 36,
 "contentOpaque": false,
 "shadow": false,
 "verticalAlign": "top",
 "minHeight": 1,
 "class": "Container",
 "scrollBarWidth": 10,
 "paddingRight": 0,
 "backgroundOpacity": 0.4,
 "minWidth": 1,
 "backgroundColor": [
  "#000000"
 ],
 "top": "0%",
 "borderSize": 0,
 "borderRadius": 0,
 "paddingBottom": 0,
 "gap": 10,
 "paddingTop": 0,
 "propagateClick": true,
 "height": "100%",
 "backgroundColorRatios": [
  0
 ],
 "scrollBarColor": "#000000",
 "data": {
  "name": "Container black"
 },
 "scrollBarOpacity": 0.5,
 "horizontalAlign": "left",
 "scrollBarVisible": "rollOver",
 "overflow": "scroll",
 "backgroundColorDirection": "vertical",
 "paddingLeft": 0
},
{
 "maxHeight": 80,
 "maxWidth": 80,
 "id": "IconButton_223F0171_3014_B375_41C1_61063C3D73B3",
 "left": 10,
 "width": 50,
 "shadow": false,
 "verticalAlign": "middle",
 "minHeight": 1,
 "class": "IconButton",
 "top": "40%",
 "backgroundOpacity": 0,
 "minWidth": 1,
 "mode": "push",
 "paddingRight": 0,
 "bottom": "40%",
 "borderSize": 0,
 "borderRadius": 0,
 "paddingBottom": 0,
 "paddingTop": 0,
 "rollOverIconURL": "skin/IconButton_223F0171_3014_B375_41C1_61063C3D73B3_rollover.png",
 "propagateClick": true,
 "iconURL": "skin/IconButton_223F0171_3014_B375_41C1_61063C3D73B3.png",
 "transparencyActive": true,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, false, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, true, 0, null, null, false)",
 "data": {
  "name": "IconButton arrow"
 },
 "horizontalAlign": "center",
 "cursor": "hand",
 "paddingLeft": 0
},
{
 "children": [
  "this.Container_0B85764A_2D07_4D95_41A5_3AC872515A8C"
 ],
 "id": "Container_4521E58D_74A8_853A_418A_CF7FF914DD83",
 "left": "0%",
 "scrollBarMargin": 2,
 "layout": "absolute",
 "width": "90%",
 "contentOpaque": false,
 "shadow": false,
 "verticalAlign": "top",
 "minHeight": 1,
 "class": "Container",
 "scrollBarWidth": 10,
 "paddingRight": 0,
 "backgroundOpacity": 0.3,
 "minWidth": 1,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "top": "0%",
 "borderSize": 0,
 "borderRadius": 0,
 "paddingBottom": 0,
 "gap": 10,
 "paddingTop": 0,
 "propagateClick": false,
 "height": "100%",
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarColor": "#000000",
 "data": {
  "name": "Container"
 },
 "scrollBarOpacity": 0.5,
 "horizontalAlign": "left",
 "scrollBarVisible": "rollOver",
 "overflow": "scroll",
 "backgroundColorDirection": "vertical",
 "paddingLeft": 0
},
{
 "maxHeight": 50,
 "maxWidth": 50,
 "id": "IconButton_1AF35943_2D07_479B_41AF_FBC8A1477882",
 "width": 50,
 "right": 9,
 "shadow": false,
 "verticalAlign": "middle",
 "minHeight": 1,
 "class": "IconButton",
 "top": "40%",
 "backgroundOpacity": 0,
 "minWidth": 1,
 "mode": "push",
 "paddingRight": 0,
 "bottom": "40%",
 "borderSize": 0,
 "borderRadius": 0,
 "paddingBottom": 0,
 "paddingTop": 0,
 "rollOverIconURL": "skin/IconButton_1AF35943_2D07_479B_41AF_FBC8A1477882_rollover.png",
 "propagateClick": true,
 "iconURL": "skin/IconButton_1AF35943_2D07_479B_41AF_FBC8A1477882.png",
 "transparencyActive": true,
 "click": "this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false)",
 "data": {
  "name": "IconButton collapse"
 },
 "horizontalAlign": "center",
 "cursor": "hand",
 "paddingLeft": 0
},
{
 "children": [
  "this.IconButton_38922473_0C06_2593_4199_C585853A1AB3"
 ],
 "id": "Container_3A67552A_0C3A_67BD_4195_ECE46CCB34EA",
 "scrollBarMargin": 2,
 "layout": "absolute",
 "width": "100%",
 "contentOpaque": false,
 "shadow": false,
 "verticalAlign": "top",
 "minHeight": 1,
 "class": "Container",
 "scrollBarWidth": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundOpacity": 0.3,
 "minWidth": 1,
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "gap": 10,
 "paddingTop": 0,
 "propagateClick": true,
 "paddingRight": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarColor": "#000000",
 "height": 140,
 "data": {
  "name": "header"
 },
 "scrollBarOpacity": 0.5,
 "horizontalAlign": "left",
 "scrollBarVisible": "rollOver",
 "overflow": "scroll",
 "backgroundColorDirection": "vertical",
 "paddingLeft": 0
},
{
 "itemMaxHeight": 1000,
 "id": "ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0",
 "left": 0,
 "itemLabelFontFamily": "Oswald",
 "rollOverItemThumbnailShadowColor": "#04A3E1",
 "width": "100%",
 "itemBorderRadius": 0,
 "verticalAlign": "middle",
 "itemHorizontalAlign": "center",
 "selectedItemThumbnailShadowBlurRadius": 16,
 "minHeight": 1,
 "itemLabelPosition": "bottom",
 "itemPaddingLeft": 3,
 "selectedItemThumbnailShadowVerticalLength": 0,
 "selectedItemThumbnailShadowHorizontalLength": 0,
 "backgroundOpacity": 0,
 "class": "ThumbnailGrid",
 "paddingRight": 70,
 "playList": "this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist",
 "itemThumbnailBorderRadius": 0,
 "minWidth": 1,
 "height": "92%",
 "borderSize": 0,
 "rollOverItemThumbnailShadowBlurRadius": 0,
 "rollOverItemThumbnailShadowVerticalLength": 0,
 "itemWidth": 220,
 "itemBackgroundOpacity": 0,
 "itemBackgroundColor": [],
 "propagateClick": true,
 "itemMinHeight": 50,
 "itemBackgroundColorRatios": [],
 "itemPaddingTop": 3,
 "itemThumbnailOpacity": 1,
 "itemVerticalAlign": "top",
 "selectedItemThumbnailShadow": true,
 "paddingLeft": 70,
 "rollOverItemLabelFontColor": "#04A3E1",
 "scrollBarMargin": 2,
 "itemThumbnailHeight": 125,
 "itemLabelTextDecoration": "none",
 "itemMinWidth": 50,
 "itemLabelFontWeight": "normal",
 "rollOverItemThumbnailShadow": true,
 "shadow": false,
 "itemPaddingRight": 3,
 "itemThumbnailScaleMode": "fit_outside",
 "itemLabelFontSize": 16,
 "rollOverItemThumbnailShadowHorizontalLength": 8,
 "itemHeight": 160,
 "selectedItemLabelFontColor": "#04A3E1",
 "scrollBarWidth": 10,
 "itemThumbnailWidth": 220,
 "itemOpacity": 1,
 "bottom": -0.2,
 "borderRadius": 5,
 "itemLabelFontColor": "#666666",
 "itemBackgroundColorDirection": "vertical",
 "paddingBottom": 70,
 "gap": 26,
 "paddingTop": 10,
 "itemThumbnailShadow": false,
 "selectedItemLabelFontWeight": "bold",
 "scrollBarColor": "#04A3E1",
 "itemPaddingBottom": 3,
 "itemLabelGap": 7,
 "itemLabelFontStyle": "italic",
 "scrollBarOpacity": 0.5,
 "itemLabelHorizontalAlign": "center",
 "horizontalAlign": "center",
 "data": {
  "name": "ThumbnailList"
 },
 "scrollBarVisible": "rollOver",
 "itemMode": "normal",
 "itemMaxWidth": 1000
},
{
 "id": "WebFrame_22F9EEFF_0C1A_2293_4165_411D4444EFEA",
 "insetBorder": false,
 "width": "100%",
 "scrollEnabled": true,
 "shadow": false,
 "url": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14377.55330038866!2d-73.99492968084243!3d40.75084469078082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9f775f259%3A0x999668d0d7c3fd7d!2s400+5th+Ave%2C+New+York%2C+NY+10018!5e0!3m2!1ses!2sus!4v1467271743182\" width=\"600\" height=\"450\" frameborder=\"0\" style=\"border:0\" allowfullscreen>",
 "minHeight": 1,
 "class": "WebFrame",
 "paddingRight": 0,
 "backgroundOpacity": 1,
 "minWidth": 1,
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "paddingTop": 0,
 "propagateClick": true,
 "backgroundColor": [
  "#FFFFFF"
 ],
 "backgroundColorRatios": [
  0
 ],
 "height": "100%",
 "data": {
  "name": "WebFrame"
 },
 "backgroundColorDirection": "vertical",
 "paddingLeft": 0
},
{
 "playbackBarHeight": 10,
 "toolTipFontSize": 12,
 "id": "MapViewer",
 "left": 0,
 "playbackBarBackgroundColorDirection": "vertical",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "toolTipTextShadowColor": "#000000",
 "toolTipTextShadowBlurRadius": 3,
 "width": "100%",
 "toolTipFontWeight": "normal",
 "playbackBarRight": 0,
 "toolTipPaddingBottom": 4,
 "progressBarBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "playbackBarHeadShadowVerticalLength": 0,
 "playbackBarProgressBorderSize": 0,
 "minHeight": 1,
 "class": "ViewerArea",
 "playbackBarBorderRadius": 0,
 "transitionDuration": 500,
 "paddingRight": 0,
 "playbackBarProgressBorderColor": "#000000",
 "minWidth": 1,
 "toolTipFontStyle": "normal",
 "toolTipShadowOpacity": 1,
 "borderSize": 0,
 "progressLeft": 0,
 "height": "99.975%",
 "playbackBarHeadBorderColor": "#000000",
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "playbackBarHeadBorderRadius": 0,
 "propagateClick": true,
 "toolTipTextShadowOpacity": 0,
 "vrPointerSelectionColor": "#FF6600",
 "toolTipFontFamily": "Arial",
 "playbackBarBorderSize": 0,
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "toolTipShadowVerticalLength": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressBarBackgroundColorDirection": "vertical",
 "progressBottom": 2,
 "paddingLeft": 0,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 10,
 "playbackBarHeadShadow": true,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "playbackBarHeadShadowHorizontalLength": 0,
 "displayTooltipInTouchScreens": true,
 "playbackBarHeadShadowOpacity": 0.7,
 "vrPointerColor": "#FFFFFF",
 "transitionMode": "blending",
 "shadow": false,
 "progressBarOpacity": 1,
 "playbackBarBorderColor": "#FFFFFF",
 "toolTipBorderSize": 1,
 "toolTipPaddingRight": 6,
 "progressBorderSize": 0,
 "toolTipPaddingLeft": 6,
 "toolTipPaddingTop": 4,
 "toolTipDisplayTime": 600,
 "progressBorderRadius": 0,
 "top": 0,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarLeft": 0,
 "paddingBottom": 0,
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBarBorderColor": "#0066FF",
 "paddingTop": 0,
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarHeadOpacity": 1,
 "playbackBarBottom": 0,
 "progressBackgroundColorDirection": "vertical",
 "toolTipShadowSpread": 0,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipBorderColor": "#767676",
 "progressBorderColor": "#FFFFFF",
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "data": {
  "name": "Floor Plan"
 },
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "toolTipShadowBlurRadius": 3,
 "toolTipOpacity": 1
},
{
 "children": [
  "this.IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E"
 ],
 "id": "Container_2F8A7686_0D4F_6B71_41A9_1A894413085C",
 "scrollBarMargin": 2,
 "layout": "absolute",
 "width": "100%",
 "contentOpaque": false,
 "shadow": false,
 "verticalAlign": "top",
 "minHeight": 1,
 "scrollBarWidth": 10,
 "class": "Container",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "gap": 10,
 "paddingTop": 0,
 "propagateClick": true,
 "height": 140,
 "scrollBarColor": "#000000",
 "data": {
  "name": "header"
 },
 "scrollBarOpacity": 0.5,
 "horizontalAlign": "left",
 "scrollBarVisible": "rollOver",
 "overflow": "scroll",
 "paddingLeft": 0
},
{
 "children": [
  "this.ViewerAreaLabeled_2A198C4C_0D3B_DFF0_419F_C9A785406D9C",
  "this.IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482",
  "this.IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510",
  "this.IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1"
 ],
 "id": "Container_2A19EC4C_0D3B_DFF0_414D_37145C22C5BC",
 "scrollBarMargin": 2,
 "layout": "absolute",
 "width": "100%",
 "contentOpaque": false,
 "shadow": false,
 "verticalAlign": "top",
 "minHeight": 1,
 "class": "Container",
 "scrollBarWidth": 10,
 "paddingRight": 0,
 "backgroundOpacity": 0.3,
 "minWidth": 1,
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "gap": 10,
 "paddingTop": 0,
 "propagateClick": true,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarColor": "#000000",
 "height": "100%",
 "data": {
  "name": "Container photo"
 },
 "scrollBarOpacity": 0.5,
 "horizontalAlign": "left",
 "scrollBarVisible": "rollOver",
 "overflow": "visible",
 "backgroundColorDirection": "vertical",
 "paddingLeft": 0
},
{
 "children": [
  "this.Image_1E19C23C_57F1_802D_41D1_9DC72DB5C1E1"
 ],
 "id": "Container_1E19E23C_57F1_802D_41D1_9B8B4D1D2BBD",
 "scrollBarMargin": 2,
 "layout": "absolute",
 "width": "55%",
 "contentOpaque": false,
 "shadow": false,
 "verticalAlign": "middle",
 "minHeight": 1,
 "class": "Container",
 "scrollBarWidth": 10,
 "paddingRight": 0,
 "backgroundOpacity": 1,
 "minWidth": 1,
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "gap": 10,
 "paddingTop": 0,
 "propagateClick": false,
 "backgroundColor": [
  "#000000"
 ],
 "backgroundColorRatios": [
  0
 ],
 "scrollBarColor": "#000000",
 "height": "100%",
 "data": {
  "name": "-left"
 },
 "scrollBarOpacity": 0.5,
 "horizontalAlign": "center",
 "scrollBarVisible": "rollOver",
 "overflow": "scroll",
 "backgroundColorDirection": "vertical",
 "paddingLeft": 0
},
{
 "children": [
  "this.Container_1E18223C_57F1_802D_41D5_C1ECF1EB519F",
  "this.Container_1E18323C_57F1_802D_41AC_3EB4DE555BBC",
  "this.Container_1E18523C_57F1_802D_41B1_88C86CD9A273"
 ],
 "id": "Container_1E19D23C_57F1_802D_41B0_92437DF80B82",
 "scrollBarMargin": 2,
 "layout": "vertical",
 "width": "45%",
 "contentOpaque": false,
 "shadow": false,
 "verticalAlign": "top",
 "minHeight": 1,
 "class": "Container",
 "scrollBarWidth": 10,
 "paddingRight": 60,
 "backgroundOpacity": 1,
 "minWidth": 460,
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 20,
 "gap": 0,
 "paddingTop": 20,
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarColor": "#0069A3",
 "height": "100%",
 "data": {
  "name": "-right"
 },
 "scrollBarOpacity": 0.51,
 "horizontalAlign": "left",
 "scrollBarVisible": "rollOver",
 "overflow": "visible",
 "backgroundColorDirection": "vertical",
 "paddingLeft": 60
},
{
 "maxHeight": 60,
 "maxWidth": 60,
 "id": "IconButton_1E18B23C_57F1_802D_41C8_61C0F9BCC1FF",
 "width": "25%",
 "shadow": false,
 "verticalAlign": "middle",
 "minHeight": 50,
 "class": "IconButton",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 50,
 "mode": "push",
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "paddingTop": 0,
 "rollOverIconURL": "skin/IconButton_1E18B23C_57F1_802D_41C8_61C0F9BCC1FF_rollover.jpg",
 "propagateClick": false,
 "iconURL": "skin/IconButton_1E18B23C_57F1_802D_41C8_61C0F9BCC1FF.jpg",
 "transparencyActive": false,
 "click": "this.setComponentVisibility(this.Container_1E18823C_57F1_802D_41C1_C325A6BB2CA9, false, 0, null, null, false)",
 "height": "75%",
 "data": {
  "name": "X"
 },
 "horizontalAlign": "center",
 "pressedIconURL": "skin/IconButton_1E18B23C_57F1_802D_41C8_61C0F9BCC1FF_pressed.jpg",
 "cursor": "hand",
 "paddingLeft": 0
},
{
 "children": [
  "this.Container_0A898462_2D0B_4D94_41B3_BDB53B7688EE",
  "this.Container_2A2CB53C_310E_0014_41C3_AB834B10253B",
  "this.Container_159EADDD_31FA_0014_41C8_8A5203EC627B",
  "this.Container_17569D7D_31FA_0015_41C4_CBC688763A8D",
  "this.Container_1758A215_31FA_0014_41B6_9A4A5384548B",
  "this.Container_17EBA2B7_3106_0014_41A9_D6C96D0633AE",
  "this.Container_168D8311_3106_01EC_41B0_F2D40886AB88",
  "this.Image_D0E56C9F_DFE4_2483_41E0_68433BCB459C"
 ],
 "id": "Container_0B85764A_2D07_4D95_41A5_3AC872515A8C",
 "left": "0%",
 "scrollBarMargin": 2,
 "layout": "absolute",
 "width": "100%",
 "contentOpaque": false,
 "shadow": false,
 "verticalAlign": "top",
 "minHeight": 1,
 "class": "Container",
 "scrollBarWidth": 10,
 "paddingRight": 40,
 "backgroundOpacity": 0.7,
 "minWidth": 1,
 "backgroundColor": [
  "#000000"
 ],
 "top": "0%",
 "borderSize": 0,
 "borderRadius": 0,
 "paddingBottom": 40,
 "gap": 10,
 "paddingTop": 40,
 "propagateClick": true,
 "height": "100%",
 "backgroundColorRatios": [
  0
 ],
 "scrollBarColor": "#000000",
 "data": {
  "name": "- Buttons set"
 },
 "scrollBarOpacity": 0.5,
 "horizontalAlign": "left",
 "scrollBarVisible": "rollOver",
 "overflow": "scroll",
 "backgroundColorDirection": "vertical",
 "paddingLeft": 40
},
{
 "maxHeight": 60,
 "maxWidth": 60,
 "id": "IconButton_38922473_0C06_2593_4199_C585853A1AB3",
 "width": "100%",
 "right": 20,
 "shadow": false,
 "verticalAlign": "top",
 "minHeight": 50,
 "class": "IconButton",
 "top": 20,
 "backgroundOpacity": 0,
 "minWidth": 50,
 "mode": "push",
 "paddingRight": 0,
 "borderSize": 0,
 "borderRadius": 0,
 "paddingBottom": 0,
 "paddingTop": 0,
 "rollOverIconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3_rollover.jpg",
 "propagateClick": true,
 "iconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3.jpg",
 "transparencyActive": false,
 "click": "this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, false, 0, null, null, false)",
 "height": "36.14%",
 "data": {
  "name": "IconButton X"
 },
 "horizontalAlign": "right",
 "pressedIconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3_pressed.jpg",
 "cursor": "hand",
 "paddingLeft": 0
},
{
 "maxHeight": 60,
 "maxWidth": 60,
 "id": "IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E",
 "width": "100%",
 "right": 20,
 "shadow": false,
 "verticalAlign": "top",
 "minHeight": 50,
 "class": "IconButton",
 "top": 20,
 "backgroundOpacity": 0,
 "minWidth": 50,
 "mode": "push",
 "paddingRight": 0,
 "borderSize": 0,
 "borderRadius": 0,
 "paddingBottom": 0,
 "paddingTop": 0,
 "rollOverIconURL": "skin/IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E_rollover.jpg",
 "propagateClick": true,
 "iconURL": "skin/IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E.jpg",
 "transparencyActive": false,
 "click": "this.setComponentVisibility(this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41, false, 0, null, null, false)",
 "height": "36.14%",
 "data": {
  "name": "IconButton X"
 },
 "horizontalAlign": "right",
 "pressedIconURL": "skin/IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E_pressed.jpg",
 "cursor": "hand",
 "paddingLeft": 0
},
{
 "playbackBarHeight": 10,
 "toolTipFontSize": 12,
 "id": "ViewerAreaLabeled_2A198C4C_0D3B_DFF0_419F_C9A785406D9C",
 "left": "0%",
 "playbackBarBackgroundColorDirection": "vertical",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "toolTipTextShadowColor": "#000000",
 "toolTipTextShadowBlurRadius": 3,
 "width": "100%",
 "toolTipFontWeight": "normal",
 "playbackBarRight": 0,
 "toolTipPaddingBottom": 4,
 "progressBarBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "playbackBarHeadShadowVerticalLength": 0,
 "playbackBarProgressBorderSize": 0,
 "minHeight": 1,
 "class": "ViewerArea",
 "playbackBarBorderRadius": 0,
 "transitionDuration": 500,
 "paddingRight": 0,
 "playbackBarProgressBorderColor": "#000000",
 "minWidth": 1,
 "toolTipFontStyle": "normal",
 "toolTipShadowOpacity": 1,
 "borderSize": 0,
 "progressLeft": 0,
 "height": "100%",
 "playbackBarHeadBorderColor": "#000000",
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "playbackBarHeadBorderRadius": 0,
 "propagateClick": true,
 "toolTipTextShadowOpacity": 0,
 "vrPointerSelectionColor": "#FF6600",
 "toolTipFontFamily": "Arial",
 "playbackBarBorderSize": 0,
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "toolTipShadowVerticalLength": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressBarBackgroundColorDirection": "vertical",
 "progressBottom": 2,
 "paddingLeft": 0,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 10,
 "playbackBarHeadShadow": true,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "playbackBarHeadShadowHorizontalLength": 0,
 "displayTooltipInTouchScreens": true,
 "playbackBarHeadShadowOpacity": 0.7,
 "vrPointerColor": "#FFFFFF",
 "transitionMode": "blending",
 "shadow": false,
 "progressBarOpacity": 1,
 "playbackBarBorderColor": "#FFFFFF",
 "toolTipBorderSize": 1,
 "toolTipPaddingRight": 6,
 "progressBorderSize": 0,
 "toolTipPaddingLeft": 6,
 "toolTipPaddingTop": 4,
 "toolTipDisplayTime": 600,
 "progressBorderRadius": 0,
 "top": "0%",
 "progressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarLeft": 0,
 "paddingBottom": 0,
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBarBorderColor": "#0066FF",
 "paddingTop": 0,
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarHeadOpacity": 1,
 "playbackBarBottom": 0,
 "progressBackgroundColorDirection": "vertical",
 "toolTipShadowSpread": 0,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipBorderColor": "#767676",
 "progressBorderColor": "#FFFFFF",
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "data": {
  "name": "Viewer photoalbum 1"
 },
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "toolTipShadowBlurRadius": 3,
 "toolTipOpacity": 1
},
{
 "maxHeight": 60,
 "maxWidth": 60,
 "id": "IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482",
 "left": 10,
 "width": "14.22%",
 "shadow": false,
 "verticalAlign": "middle",
 "minHeight": 50,
 "class": "IconButton",
 "top": "20%",
 "backgroundOpacity": 0,
 "minWidth": 50,
 "mode": "push",
 "paddingRight": 0,
 "bottom": "20%",
 "borderSize": 0,
 "borderRadius": 0,
 "paddingBottom": 0,
 "paddingTop": 0,
 "rollOverIconURL": "skin/IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482_rollover.png",
 "propagateClick": true,
 "iconURL": "skin/IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482.png",
 "transparencyActive": false,
 "data": {
  "name": "IconButton <"
 },
 "horizontalAlign": "center",
 "pressedIconURL": "skin/IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482_pressed.png",
 "cursor": "hand",
 "paddingLeft": 0
},
{
 "maxHeight": 60,
 "maxWidth": 60,
 "id": "IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510",
 "width": "14.22%",
 "right": 10,
 "shadow": false,
 "verticalAlign": "middle",
 "minHeight": 50,
 "class": "IconButton",
 "top": "20%",
 "backgroundOpacity": 0,
 "minWidth": 50,
 "mode": "push",
 "paddingRight": 0,
 "bottom": "20%",
 "borderSize": 0,
 "borderRadius": 0,
 "paddingBottom": 0,
 "paddingTop": 0,
 "rollOverIconURL": "skin/IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510_rollover.png",
 "propagateClick": true,
 "iconURL": "skin/IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510.png",
 "transparencyActive": false,
 "data": {
  "name": "IconButton >"
 },
 "horizontalAlign": "center",
 "pressedIconURL": "skin/IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510_pressed.png",
 "cursor": "hand",
 "paddingLeft": 0
},
{
 "maxHeight": 60,
 "maxWidth": 60,
 "id": "IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1",
 "width": "10%",
 "right": 20,
 "shadow": false,
 "verticalAlign": "top",
 "minHeight": 50,
 "class": "IconButton",
 "top": 20,
 "backgroundOpacity": 0,
 "minWidth": 50,
 "mode": "push",
 "paddingRight": 0,
 "borderSize": 0,
 "borderRadius": 0,
 "paddingBottom": 0,
 "paddingTop": 0,
 "rollOverIconURL": "skin/IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1_rollover.jpg",
 "propagateClick": true,
 "iconURL": "skin/IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1.jpg",
 "transparencyActive": false,
 "click": "this.setComponentVisibility(this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E, false, 0, null, null, false)",
 "height": "10%",
 "data": {
  "name": "IconButton X"
 },
 "horizontalAlign": "right",
 "pressedIconURL": "skin/IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1_pressed.jpg",
 "cursor": "hand",
 "paddingLeft": 0
},
{
 "maxHeight": 1000,
 "maxWidth": 2000,
 "id": "Image_1E19C23C_57F1_802D_41D1_9DC72DB5C1E1",
 "left": "0%",
 "width": "100%",
 "shadow": false,
 "verticalAlign": "bottom",
 "url": "skin/Image_1E19C23C_57F1_802D_41D1_9DC72DB5C1E1.jpg",
 "minHeight": 1,
 "class": "Image",
 "top": "0%",
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "paddingTop": 0,
 "propagateClick": false,
 "paddingRight": 0,
 "height": "100%",
 "scaleMode": "fit_outside",
 "data": {
  "name": "Image40635"
 },
 "horizontalAlign": "center",
 "paddingLeft": 0
},
{
 "id": "Container_1E18223C_57F1_802D_41D5_C1ECF1EB519F",
 "scrollBarMargin": 2,
 "layout": "horizontal",
 "width": "100%",
 "contentOpaque": false,
 "shadow": false,
 "verticalAlign": "top",
 "minHeight": 0,
 "class": "Container",
 "scrollBarWidth": 10,
 "paddingRight": 0,
 "backgroundOpacity": 0.3,
 "minWidth": 1,
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "gap": 0,
 "paddingTop": 20,
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarColor": "#000000",
 "height": "5%",
 "data": {
  "name": "Container space"
 },
 "scrollBarOpacity": 0.5,
 "horizontalAlign": "right",
 "scrollBarVisible": "rollOver",
 "overflow": "scroll",
 "backgroundColorDirection": "vertical",
 "paddingLeft": 0
},
{
 "children": [
  "this.HTMLText_1E18123C_57F1_802D_41D2_B0CD0D6533F4",
  "this.Container_1E18623C_57F1_802D_41D5_C4D10C61A206"
 ],
 "id": "Container_1E18323C_57F1_802D_41AC_3EB4DE555BBC",
 "scrollBarMargin": 2,
 "layout": "vertical",
 "width": "100%",
 "contentOpaque": false,
 "shadow": false,
 "verticalAlign": "top",
 "minHeight": 520,
 "class": "Container",
 "scrollBarWidth": 10,
 "paddingRight": 0,
 "backgroundOpacity": 0.3,
 "minWidth": 100,
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 30,
 "gap": 10,
 "paddingTop": 0,
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarColor": "#E73B2C",
 "height": "100%",
 "data": {
  "name": "Container text"
 },
 "scrollBarOpacity": 0.79,
 "horizontalAlign": "left",
 "scrollBarVisible": "rollOver",
 "overflow": "scroll",
 "backgroundColorDirection": "vertical",
 "paddingLeft": 0
},
{
 "id": "Container_1E18523C_57F1_802D_41B1_88C86CD9A273",
 "scrollBarMargin": 2,
 "layout": "horizontal",
 "width": 370,
 "contentOpaque": false,
 "shadow": false,
 "verticalAlign": "top",
 "minHeight": 1,
 "class": "Container",
 "scrollBarWidth": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundOpacity": 0.3,
 "minWidth": 1,
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "gap": 10,
 "paddingTop": 0,
 "propagateClick": false,
 "paddingRight": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarColor": "#000000",
 "height": 40,
 "data": {
  "name": "Container space"
 },
 "scrollBarOpacity": 0.5,
 "horizontalAlign": "left",
 "scrollBarVisible": "rollOver",
 "overflow": "scroll",
 "backgroundColorDirection": "vertical",
 "paddingLeft": 0
},
{
 "children": [
  "this.Container_106C4A62_2D09_C594_41C0_0D00619DF541",
  "this.Button_E44E9040_E977_735F_41DD_9D508FF850AF",
  "this.Container_1BA343A6_2D0B_4A9D_41A8_3A02573B3B89",
  "this.Button_0B73474A_2D18_CB95_41B5_180037BA80BC",
  "this.Container_E7136F9A_E97F_8DE3_41D2_4DAD1C770CE4",
  "this.Button_1D2C4FDF_2D7F_BAAB_4198_FBD1E9E469FF",
  "this.Container_15283BED_2D08_DA6F_41C5_5635F0C6DB03",
  "this.Button_0399826A_2D79_4594_41BA_934A50D0E6B4",
  "this.Container_152401E8_2D0B_4694_41C5_9141C985F9C3",
  "this.Button_1D0C50DE_2D07_C6AD_41C1_CF4547A6CFAB",
  "this.Container_D69F9222_D993_2372_41E1_F8E460F167DC",
  "this.Button_E71B3741_E97A_9D61_41E1_97CEF36812FA",
  "this.Container_E73ED5AD_E97E_9D21_41DF_7598611DC366",
  "this.Button_D0D4C78E_DFE4_6485_41E4_5902ABCB15AD",
  "this.Container_E7AD70B7_E97B_9322_41D9_23314646D8C0"
 ],
 "id": "Container_0A898462_2D0B_4D94_41B3_BDB53B7688EE",
 "left": "0%",
 "scrollBarMargin": 2,
 "layout": "vertical",
 "width": "100%",
 "contentOpaque": false,
 "shadow": false,
 "verticalAlign": "middle",
 "minHeight": 1,
 "class": "Container",
 "scrollBarWidth": 10,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "top": "39.67%",
 "bottom": "12.22%",
 "borderSize": 0,
 "paddingBottom": 0,
 "gap": 0,
 "paddingTop": 0,
 "propagateClick": true,
 "paddingRight": 0,
 "scrollBarColor": "#000000",
 "data": {
  "name": "-Level 1"
 },
 "scrollBarOpacity": 0.5,
 "horizontalAlign": "left",
 "scrollBarVisible": "rollOver",
 "overflow": "scroll",
 "paddingLeft": 0
},
{
 "children": [
  "this.Button_2A2DA53B_310E_001C_41C7_8885E712C50B",
  "this.Container_2A2DB53B_310E_001C_41BA_0206228E495C",
  "this.Container_1303E3BB_3106_001D_41C8_60D6F4D70B2F",
  "this.Button_2A2D853B_310E_001C_41C4_1C2E2BAFC35D",
  "this.Button_2A2DE53B_310E_001C_41BB_C7AB6950A4DD",
  "this.Button_2A2C253B_310E_001C_41B6_D3A7F4F68C3E",
  "this.Button_2A2C053B_310E_001C_41A2_583DE489828C",
  "this.Button_2A2C753B_310E_001C_41C4_B649CCC20E3D",
  "this.Button_2A2C553C_310E_0014_41C4_86393D0ADCC7",
  "this.Button_15EF2665_3106_0035_41AE_9BACA1A48D02",
  "this.Button_15F5A318_3106_001C_41C5_9AA2EF2184CF",
  "this.Button_1203FDB8_3106_001C_41B6_C9BE8EDD0DA9",
  "this.Button_13D4FC1E_310A_0017_41BA_DDA6D071C1BA"
 ],
 "id": "Container_2A2CB53C_310E_0014_41C3_AB834B10253B",
 "left": "0%",
 "scrollBarMargin": 2,
 "layout": "vertical",
 "width": "100%",
 "contentOpaque": false,
 "shadow": false,
 "verticalAlign": "middle",
 "minHeight": 1,
 "class": "Container",
 "scrollBarWidth": 10,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "top": "25%",
 "creationPolicy": "inAdvance",
 "bottom": "25%",
 "borderSize": 0,
 "paddingBottom": 0,
 "gap": 0,
 "paddingTop": 0,
 "propagateClick": true,
 "paddingRight": 0,
 "scrollBarColor": "#000000",
 "data": {
  "name": "-Level 2-1"
 },
 "scrollBarOpacity": 0.5,
 "visible": false,
 "horizontalAlign": "left",
 "scrollBarVisible": "rollOver",
 "overflow": "scroll",
 "paddingLeft": 0
},
{
 "children": [
  "this.Button_15A15DDC_31FA_0014_41A4_CE4305FEC7D1",
  "this.Container_15A14DDC_31FA_0014_41BE_C93192DD207E",
  "this.Container_15A16DDC_31FA_0014_4199_0FBF7553300D",
  "this.Button_15A10DDC_31FA_0014_4185_021C898E177D",
  "this.Button_15A13DDC_31FA_0014_41C5_41AE80876834",
  "this.Button_15A12DDC_31FA_0014_416B_ED845741AE5F",
  "this.Button_159EDDDC_31FA_0014_419A_61C18E43FE01",
  "this.Button_159ECDDC_31FA_0014_41B9_2D5AB1021813",
  "this.Button_159EFDDC_31FA_0014_41C6_9CF7032F84E0",
  "this.Button_159EEDDC_31FA_0014_41B6_22A86B2D2FEB",
  "this.Button_159E9DDC_31FA_0015_41B6_CB1D433C7673",
  "this.Button_159E8DDD_31FA_0014_41C5_F18F441AF371",
  "this.Button_159EBDDD_31FA_0014_41C8_935504B30727"
 ],
 "id": "Container_159EADDD_31FA_0014_41C8_8A5203EC627B",
 "left": "0%",
 "scrollBarMargin": 2,
 "layout": "vertical",
 "width": "100%",
 "contentOpaque": false,
 "shadow": false,
 "verticalAlign": "middle",
 "minHeight": 1,
 "class": "Container",
 "scrollBarWidth": 10,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "top": "25%",
 "creationPolicy": "inAdvance",
 "bottom": "25%",
 "borderSize": 0,
 "paddingBottom": 0,
 "gap": 0,
 "paddingTop": 0,
 "propagateClick": true,
 "paddingRight": 0,
 "scrollBarColor": "#000000",
 "data": {
  "name": "-Level 2-2"
 },
 "scrollBarOpacity": 0.5,
 "visible": false,
 "horizontalAlign": "left",
 "scrollBarVisible": "rollOver",
 "overflow": "scroll",
 "paddingLeft": 0
},
{
 "children": [
  "this.Button_1757CD7D_31FA_0015_4143_A9E37B16A50B",
  "this.Container_17579D7D_31FA_0015_41A1_D2B94269F28D",
  "this.Container_17578D7D_31FA_0015_41BE_353D3005648A",
  "this.Button_1757AD7D_31FA_0015_41C7_FB79F56FA149",
  "this.Button_17565D7D_31FA_0015_4193_78BBCB2DC70F",
  "this.Button_17564D7D_31FA_0015_41B8_A9191CD56C52",
  "this.Button_17567D7D_31FA_0015_41C2_1E0D0AF05C7A",
  "this.Button_17566D7D_31FA_0015_41AD_98D7C60C694F",
  "this.Button_17561D7D_31FA_0015_41B5_BD72FAC26B8B",
  "this.Button_17560D7D_31FA_0015_41C4_7F0EC7540CC2",
  "this.Button_17562D7D_31FA_0015_41A3_96B282B30DBA",
  "this.Button_1756DD7D_31FA_0015_41A5_988B67FCF8B7",
  "this.Button_1756FD7D_31FA_0015_41C7_DA2AAC2AAAEC"
 ],
 "id": "Container_17569D7D_31FA_0015_41C4_CBC688763A8D",
 "left": "0%",
 "scrollBarMargin": 2,
 "layout": "vertical",
 "width": "100%",
 "contentOpaque": false,
 "shadow": false,
 "verticalAlign": "middle",
 "minHeight": 1,
 "class": "Container",
 "scrollBarWidth": 10,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "top": "25%",
 "creationPolicy": "inAdvance",
 "bottom": "25%",
 "borderSize": 0,
 "paddingBottom": 0,
 "gap": 0,
 "paddingTop": 0,
 "propagateClick": true,
 "paddingRight": 0,
 "scrollBarColor": "#000000",
 "data": {
  "name": "-Level 2-3"
 },
 "scrollBarOpacity": 0.5,
 "visible": false,
 "horizontalAlign": "left",
 "scrollBarVisible": "rollOver",
 "overflow": "scroll",
 "paddingLeft": 0
},
{
 "children": [
  "this.Button_175A5214_31FA_0014_4198_930DF49BADD9",
  "this.Container_175A4215_31FA_0014_41B2_5B8676CC3F2F",
  "this.Container_1759B215_31FA_0014_41C0_84C99CBD5517",
  "this.Button_1759A215_31FA_0014_41C7_F6B1044E5BB3",
  "this.Button_17598215_31FA_0014_41AC_1166AB319171",
  "this.Button_1759F215_31FA_0014_41BD_BBFA5FB0D882",
  "this.Button_1759D215_31FA_0014_41AD_B6C5744A0B97",
  "this.Button_17593215_31FA_0014_41C0_42BAFB0080F0",
  "this.Button_17592215_31FA_0014_41B2_AA3B5CC318B8",
  "this.Button_17590215_31FA_0014_41C1_2B2D012DCC76",
  "this.Button_17597215_31FA_0014_41C0_9BEE1DE4D7F6",
  "this.Button_17596215_31FA_0014_41C6_A42670770708",
  "this.Button_1758B215_31FA_0014_41BC_C4EAC2A9544B"
 ],
 "id": "Container_1758A215_31FA_0014_41B6_9A4A5384548B",
 "left": "0%",
 "scrollBarMargin": 2,
 "layout": "vertical",
 "width": "100%",
 "contentOpaque": false,
 "shadow": false,
 "verticalAlign": "middle",
 "minHeight": 1,
 "class": "Container",
 "scrollBarWidth": 10,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "top": "25%",
 "creationPolicy": "inAdvance",
 "bottom": "25%",
 "borderSize": 0,
 "paddingBottom": 0,
 "gap": 0,
 "paddingTop": 0,
 "propagateClick": true,
 "paddingRight": 0,
 "scrollBarColor": "#000000",
 "data": {
  "name": "-Level 2-4"
 },
 "scrollBarOpacity": 0.5,
 "visible": false,
 "horizontalAlign": "left",
 "scrollBarVisible": "rollOver",
 "overflow": "scroll",
 "paddingLeft": 0
},
{
 "children": [
  "this.Button_17EA82B7_3106_0014_41C2_C9B0D9E6F22C",
  "this.Container_17EA92B7_3106_0014_41A6_2B88DF32BBA7",
  "this.Container_17EAA2B7_3106_0014_41B0_ACBB1485A79E",
  "this.Button_17EAB2B7_3106_0014_41A7_209417AD3E9A",
  "this.Button_17EAD2B7_3106_0014_41C0_0B5453B4841D",
  "this.Button_17EAE2B7_3106_0014_41C7_DB7FC43AAEE0",
  "this.Button_17EB02B7_3106_0014_41AF_05D9AC36B189",
  "this.Button_17EB32B7_3106_0014_41C8_467BF6AECBE8",
  "this.Button_17EB42B7_3106_0014_41B0_CE70CBDDF438",
  "this.Button_17EB52B7_3106_0014_419C_439E593AEC43",
  "this.Button_17EB62B7_3106_0014_41C5_43B38271B353",
  "this.Button_17EB72B7_3106_0014_41B9_61857077BF4A",
  "this.Button_17EB92B7_3106_0014_41B2_34A3E3F63779"
 ],
 "id": "Container_17EBA2B7_3106_0014_41A9_D6C96D0633AE",
 "left": "0%",
 "scrollBarMargin": 2,
 "layout": "vertical",
 "width": "100%",
 "contentOpaque": false,
 "shadow": false,
 "verticalAlign": "middle",
 "minHeight": 1,
 "class": "Container",
 "scrollBarWidth": 10,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "top": "25%",
 "creationPolicy": "inAdvance",
 "bottom": "25%",
 "borderSize": 0,
 "paddingBottom": 0,
 "gap": 0,
 "paddingTop": 0,
 "propagateClick": true,
 "paddingRight": 0,
 "scrollBarColor": "#000000",
 "data": {
  "name": "-Level 2-5"
 },
 "scrollBarOpacity": 0.5,
 "visible": false,
 "horizontalAlign": "left",
 "scrollBarVisible": "rollOver",
 "overflow": "scroll",
 "paddingLeft": 0
},
{
 "children": [
  "this.Button_168CA310_3106_01EC_41C7_72CE0522951A",
  "this.Container_168C8310_3106_01EC_4187_B16F315A4A23",
  "this.Container_168D7310_3106_01EC_41BE_5FCBD9E27BE4",
  "this.Button_168D6310_3106_01EC_41B8_A0B6BE627547",
  "this.Button_168D5310_3106_01EC_41B5_96D9387401B8",
  "this.Button_168D3310_3106_01EC_41AC_5D524E4677A5",
  "this.Button_168D2310_3106_01EC_41B8_9D7D1B2B55FA",
  "this.Button_168D0310_3106_01EC_41A1_FA8FC42E6FF3",
  "this.Button_168DE310_3106_01EC_4192_6A9F468A0ADE",
  "this.Button_168DD310_3106_01EC_4190_7815FA70349E",
  "this.Button_168DB310_3106_01EC_41B2_3511AA5E40E1",
  "this.Button_168DA310_3106_01EC_41BE_DF88732C2A28",
  "this.Button_168D9311_3106_01EC_41A8_3BD8769525D6"
 ],
 "id": "Container_168D8311_3106_01EC_41B0_F2D40886AB88",
 "left": "0%",
 "scrollBarMargin": 2,
 "layout": "vertical",
 "width": "100%",
 "contentOpaque": false,
 "shadow": false,
 "verticalAlign": "middle",
 "minHeight": 1,
 "class": "Container",
 "scrollBarWidth": 10,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "top": "25%",
 "creationPolicy": "inAdvance",
 "bottom": "25%",
 "borderSize": 0,
 "paddingBottom": 0,
 "gap": 0,
 "paddingTop": 0,
 "propagateClick": true,
 "paddingRight": 0,
 "scrollBarColor": "#000000",
 "data": {
  "name": "-Level 2-6"
 },
 "scrollBarOpacity": 0.5,
 "visible": false,
 "horizontalAlign": "left",
 "scrollBarVisible": "rollOver",
 "overflow": "scroll",
 "paddingLeft": 0
},
{
 "maxHeight": 638,
 "maxWidth": 720,
 "id": "Image_D0E56C9F_DFE4_2483_41E0_68433BCB459C",
 "left": "2.44%",
 "width": "89.862%",
 "shadow": false,
 "verticalAlign": "middle",
 "url": "skin/Image_D0E56C9F_DFE4_2483_41E0_68433BCB459C.jpeg",
 "minHeight": 1,
 "class": "Image",
 "top": "2.81%",
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "paddingTop": 0,
 "propagateClick": false,
 "paddingRight": 0,
 "height": "28.465%",
 "scaleMode": "fit_inside",
 "data": {
  "name": "Image3757"
 },
 "horizontalAlign": "center",
 "paddingLeft": 0
},
{
 "id": "HTMLText_1E18123C_57F1_802D_41D2_B0CD0D6533F4",
 "scrollBarMargin": 2,
 "width": "100%",
 "shadow": false,
 "minHeight": 1,
 "scrollBarWidth": 10,
 "class": "HTMLText",
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "paddingTop": 0,
 "propagateClick": false,
 "paddingRight": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:8.3vh;font-family:'Bebas Neue Bold';\">___</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:4.58vh;font-family:'Oswald';\"><B><I>LOREM IPSUM</I></B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:4.58vh;font-family:'Oswald';\"><B><I>DOLOR SIT AMET</I></B></SPAN></SPAN></DIV></div>",
 "scrollBarColor": "#04A3E1",
 "height": "46%",
 "data": {
  "name": "HTMLText18899"
 },
 "scrollBarOpacity": 0,
 "scrollBarVisible": "rollOver",
 "paddingLeft": 0
},
{
 "children": [
  "this.Image_1E18723C_57F1_802D_41C5_8325536874A5",
  "this.HTMLText_1E18423C_57F1_802D_41C4_458DB7F892AC"
 ],
 "id": "Container_1E18623C_57F1_802D_41D5_C4D10C61A206",
 "scrollBarMargin": 2,
 "layout": "horizontal",
 "width": "100%",
 "contentOpaque": false,
 "shadow": false,
 "verticalAlign": "top",
 "minHeight": 1,
 "class": "Container",
 "scrollBarWidth": 10,
 "paddingRight": 0,
 "backgroundOpacity": 0.3,
 "minWidth": 1,
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "gap": 10,
 "paddingTop": 0,
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarColor": "#000000",
 "height": "75%",
 "data": {
  "name": "- content"
 },
 "scrollBarOpacity": 0.5,
 "horizontalAlign": "left",
 "scrollBarVisible": "rollOver",
 "overflow": "scroll",
 "backgroundColorDirection": "vertical",
 "paddingLeft": 0
},
{
 "id": "Container_106C4A62_2D09_C594_41C0_0D00619DF541",
 "scrollBarMargin": 2,
 "layout": "absolute",
 "width": "100%",
 "contentOpaque": false,
 "shadow": false,
 "verticalAlign": "top",
 "minHeight": 1,
 "class": "Container",
 "scrollBarWidth": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundOpacity": 0.3,
 "minWidth": 1,
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "gap": 10,
 "paddingTop": 0,
 "propagateClick": true,
 "paddingRight": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarColor": "#000000",
 "height": 1,
 "data": {
  "name": "line"
 },
 "scrollBarOpacity": 0.5,
 "horizontalAlign": "left",
 "scrollBarVisible": "rollOver",
 "overflow": "scroll",
 "backgroundColorDirection": "vertical",
 "paddingLeft": 0
},
{
 "pressedLabel": "Inserdt Text",
 "click": "this.openLink('https://wa.me/message/6EA2KLKO7YXYI1', '_blank')",
 "fontColor": "#FFFFFF",
 "id": "Button_E44E9040_E977_735F_41DD_9D508FF850AF",
 "rollOverBackgroundOpacity": 0.8,
 "pressedBackgroundOpacity": 1,
 "width": "100%",
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "iconHeight": 32,
 "layout": "horizontal",
 "shadow": false,
 "verticalAlign": "middle",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadowBlurRadius": 6,
 "minHeight": 1,
 "class": "Button",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "borderColor": "#000000",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "mode": "push",
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "paddingTop": 0,
 "propagateClick": true,
 "height": 50,
 "label": "FA\u00c7A AQUI SUA COTA\u00c7\u00c3O",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "fontSize": "22px",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 5,
 "fontStyle": "italic",
 "textDecoration": "none",
 "iconWidth": 32,
 "horizontalAlign": "left",
 "data": {
  "name": "Button Location"
 },
 "fontWeight": "normal",
 "cursor": "hand",
 "iconBeforeLabel": true,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 10
},
{
 "id": "Container_1BA343A6_2D0B_4A9D_41A8_3A02573B3B89",
 "scrollBarMargin": 2,
 "layout": "absolute",
 "width": "100%",
 "contentOpaque": false,
 "shadow": false,
 "verticalAlign": "top",
 "minHeight": 1,
 "class": "Container",
 "scrollBarWidth": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundOpacity": 0.3,
 "minWidth": 1,
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "gap": 10,
 "paddingTop": 0,
 "propagateClick": true,
 "paddingRight": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarColor": "#000000",
 "height": 1,
 "data": {
  "name": "line"
 },
 "scrollBarOpacity": 0.5,
 "horizontalAlign": "left",
 "scrollBarVisible": "rollOver",
 "overflow": "scroll",
 "backgroundColorDirection": "vertical",
 "paddingLeft": 0
},
{
 "pressedLabel": "Inserdt Text",
 "click": "this.openLink('https://www.instagram.com/star.protecaoveicularjoinville/', '_blank')",
 "fontColor": "#FFFFFF",
 "id": "Button_0B73474A_2D18_CB95_41B5_180037BA80BC",
 "rollOverBackgroundOpacity": 0.8,
 "pressedBackgroundOpacity": 1,
 "width": "100%",
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "iconHeight": 32,
 "layout": "horizontal",
 "shadow": false,
 "verticalAlign": "middle",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadowBlurRadius": 6,
 "minHeight": 1,
 "class": "Button",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "borderColor": "#000000",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "mode": "push",
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "paddingTop": 0,
 "propagateClick": true,
 "height": 50,
 "label": "INSTAGRAM",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "fontSize": "22px",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 5,
 "fontStyle": "italic",
 "textDecoration": "none",
 "iconWidth": 32,
 "horizontalAlign": "left",
 "data": {
  "name": "Button Location"
 },
 "fontWeight": "normal",
 "cursor": "hand",
 "iconBeforeLabel": true,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 10
},
{
 "id": "Container_E7136F9A_E97F_8DE3_41D2_4DAD1C770CE4",
 "scrollBarMargin": 2,
 "layout": "absolute",
 "width": "100%",
 "contentOpaque": false,
 "shadow": false,
 "verticalAlign": "top",
 "minHeight": 1,
 "class": "Container",
 "scrollBarWidth": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundOpacity": 0.3,
 "minWidth": 1,
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "gap": 10,
 "paddingTop": 0,
 "propagateClick": true,
 "paddingRight": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarColor": "#000000",
 "height": 1,
 "data": {
  "name": "line"
 },
 "scrollBarOpacity": 0.5,
 "horizontalAlign": "left",
 "scrollBarVisible": "rollOver",
 "overflow": "scroll",
 "backgroundColorDirection": "vertical",
 "paddingLeft": 0
},
{
 "pressedBackgroundOpacity": 1,
 "click": "this.openLink('https://www.facebook.com/star.joinvilleoficial/', '_blank')",
 "fontColor": "#FFFFFF",
 "id": "Button_1D2C4FDF_2D7F_BAAB_4198_FBD1E9E469FF",
 "rollOverBackgroundOpacity": 0.8,
 "width": "100%",
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "iconHeight": 32,
 "layout": "horizontal",
 "shadow": false,
 "verticalAlign": "middle",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadowBlurRadius": 6,
 "minHeight": 1,
 "class": "Button",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "borderColor": "#000000",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "mode": "push",
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "paddingTop": 0,
 "propagateClick": true,
 "height": 50,
 "label": "FACEBOOK",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "fontSize": "22px",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 5,
 "fontStyle": "italic",
 "textDecoration": "none",
 "iconWidth": 32,
 "horizontalAlign": "left",
 "data": {
  "name": "Button Floorplan"
 },
 "fontWeight": "normal",
 "cursor": "hand",
 "iconBeforeLabel": true,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 10
},
{
 "id": "Container_15283BED_2D08_DA6F_41C5_5635F0C6DB03",
 "scrollBarMargin": 2,
 "layout": "absolute",
 "width": "100%",
 "contentOpaque": false,
 "shadow": false,
 "verticalAlign": "top",
 "minHeight": 1,
 "class": "Container",
 "scrollBarWidth": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundOpacity": 0.3,
 "minWidth": 1,
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "gap": 10,
 "paddingTop": 0,
 "propagateClick": true,
 "paddingRight": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarColor": "#000000",
 "height": 1,
 "data": {
  "name": "line"
 },
 "scrollBarOpacity": 0.5,
 "horizontalAlign": "left",
 "scrollBarVisible": "rollOver",
 "overflow": "scroll",
 "backgroundColorDirection": "vertical",
 "paddingLeft": 0
},
{
 "pressedBackgroundOpacity": 1,
 "click": "this.openLink('https://wa.me/message/6EA2KLKO7YXYI1', '_blank')",
 "fontColor": "#FFFFFF",
 "id": "Button_0399826A_2D79_4594_41BA_934A50D0E6B4",
 "rollOverBackgroundOpacity": 0.8,
 "width": "100%",
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "iconHeight": 32,
 "layout": "horizontal",
 "shadow": false,
 "verticalAlign": "middle",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadowBlurRadius": 6,
 "minHeight": 1,
 "class": "Button",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "borderColor": "#000000",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "mode": "push",
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "paddingTop": 0,
 "propagateClick": true,
 "height": 50,
 "label": "WHATSAPP",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "fontSize": "22px",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 5,
 "fontStyle": "italic",
 "textDecoration": "none",
 "iconWidth": 32,
 "horizontalAlign": "left",
 "data": {
  "name": "Button Photoalbum"
 },
 "fontWeight": "normal",
 "cursor": "hand",
 "iconBeforeLabel": true,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 10
},
{
 "id": "Container_152401E8_2D0B_4694_41C5_9141C985F9C3",
 "scrollBarMargin": 2,
 "layout": "absolute",
 "width": "100%",
 "contentOpaque": false,
 "shadow": false,
 "verticalAlign": "top",
 "minHeight": 1,
 "class": "Container",
 "scrollBarWidth": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundOpacity": 0.3,
 "minWidth": 1,
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "gap": 10,
 "paddingTop": 0,
 "propagateClick": true,
 "paddingRight": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarColor": "#000000",
 "height": 1,
 "data": {
  "name": "line"
 },
 "scrollBarOpacity": 0.5,
 "horizontalAlign": "left",
 "scrollBarVisible": "rollOver",
 "overflow": "scroll",
 "backgroundColorDirection": "vertical",
 "paddingLeft": 0
},
{
 "pressedBackgroundOpacity": 1,
 "click": "this.openLink('tel:04732785542', '_blank')",
 "fontColor": "#FFFFFF",
 "id": "Button_1D0C50DE_2D07_C6AD_41C1_CF4547A6CFAB",
 "rollOverBackgroundOpacity": 0.8,
 "width": "100%",
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "iconHeight": 32,
 "layout": "horizontal",
 "shadow": false,
 "verticalAlign": "middle",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadowBlurRadius": 6,
 "minHeight": 1,
 "class": "Button",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "borderColor": "#000000",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "mode": "push",
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "paddingTop": 0,
 "propagateClick": true,
 "height": 50,
 "label": "TELEFONE ",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "fontSize": "22px",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 5,
 "fontStyle": "italic",
 "textDecoration": "none",
 "iconWidth": 32,
 "horizontalAlign": "left",
 "data": {
  "name": "Button Contact"
 },
 "fontWeight": "normal",
 "cursor": "hand",
 "iconBeforeLabel": true,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 10
},
{
 "id": "Container_D69F9222_D993_2372_41E1_F8E460F167DC",
 "scrollBarMargin": 2,
 "layout": "absolute",
 "width": "100%",
 "contentOpaque": false,
 "shadow": false,
 "verticalAlign": "top",
 "minHeight": 1,
 "class": "Container",
 "scrollBarWidth": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundOpacity": 0.3,
 "minWidth": 1,
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "gap": 10,
 "paddingTop": 0,
 "propagateClick": true,
 "paddingRight": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarColor": "#000000",
 "height": 1,
 "data": {
  "name": "line"
 },
 "scrollBarOpacity": 0.5,
 "horizontalAlign": "left",
 "scrollBarVisible": "rollOver",
 "overflow": "scroll",
 "backgroundColorDirection": "vertical",
 "paddingLeft": 0
},
{
 "pressedBackgroundOpacity": 1,
 "click": "this.openLink('tel:047999430047', '_blank')",
 "fontColor": "#FFFFFF",
 "id": "Button_E71B3741_E97A_9D61_41E1_97CEF36812FA",
 "rollOverBackgroundOpacity": 0.8,
 "width": "100%",
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "iconHeight": 32,
 "layout": "horizontal",
 "shadow": false,
 "verticalAlign": "middle",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadowBlurRadius": 6,
 "minHeight": 1,
 "class": "Button",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "borderColor": "#000000",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "mode": "push",
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "paddingTop": 0,
 "propagateClick": true,
 "height": 50,
 "label": "TELEFONE CEL.",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "fontSize": "22px",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 5,
 "fontStyle": "italic",
 "textDecoration": "none",
 "iconWidth": 32,
 "horizontalAlign": "left",
 "data": {
  "name": "Button Contact"
 },
 "fontWeight": "normal",
 "cursor": "hand",
 "iconBeforeLabel": true,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 10
},
{
 "id": "Container_E73ED5AD_E97E_9D21_41DF_7598611DC366",
 "scrollBarMargin": 2,
 "layout": "absolute",
 "width": "100%",
 "contentOpaque": false,
 "shadow": false,
 "verticalAlign": "top",
 "minHeight": 1,
 "class": "Container",
 "scrollBarWidth": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundOpacity": 0.3,
 "minWidth": 1,
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "gap": 10,
 "paddingTop": 0,
 "propagateClick": true,
 "paddingRight": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarColor": "#000000",
 "height": 1,
 "data": {
  "name": "line"
 },
 "scrollBarOpacity": 0.5,
 "horizontalAlign": "left",
 "scrollBarVisible": "rollOver",
 "overflow": "scroll",
 "backgroundColorDirection": "vertical",
 "paddingLeft": 0
},
{
 "pressedBackgroundOpacity": 1,
 "click": "this.openLink('https://goo.gl/maps/E1XRcMEtJqvvBSrj6', '_blank')",
 "fontColor": "#FFFFFF",
 "id": "Button_D0D4C78E_DFE4_6485_41E4_5902ABCB15AD",
 "rollOverBackgroundOpacity": 0.8,
 "width": "100%",
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "iconHeight": 32,
 "layout": "horizontal",
 "shadow": false,
 "verticalAlign": "middle",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadowBlurRadius": 6,
 "minHeight": 1,
 "class": "Button",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "borderColor": "#000000",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "mode": "push",
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "paddingTop": 0,
 "propagateClick": true,
 "height": 50,
 "label": "LOCALIZA\u00c7\u00c3O",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "fontSize": "22px",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 5,
 "fontStyle": "italic",
 "textDecoration": "none",
 "iconWidth": 32,
 "horizontalAlign": "left",
 "data": {
  "name": "Button Contact"
 },
 "fontWeight": "normal",
 "cursor": "hand",
 "iconBeforeLabel": true,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 10
},
{
 "id": "Container_E7AD70B7_E97B_9322_41D9_23314646D8C0",
 "scrollBarMargin": 2,
 "layout": "absolute",
 "width": "100%",
 "contentOpaque": false,
 "shadow": false,
 "verticalAlign": "top",
 "minHeight": 1,
 "class": "Container",
 "scrollBarWidth": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundOpacity": 0.3,
 "minWidth": 1,
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "gap": 10,
 "paddingTop": 0,
 "propagateClick": true,
 "paddingRight": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarColor": "#000000",
 "height": 1,
 "data": {
  "name": "line"
 },
 "scrollBarOpacity": 0.5,
 "horizontalAlign": "left",
 "scrollBarVisible": "rollOver",
 "overflow": "scroll",
 "backgroundColorDirection": "vertical",
 "paddingLeft": 0
},
{
 "rollOverFontFamily": "Oswald",
 "rollOverFontSize": 18,
 "click": "this.setComponentVisibility(this.Container_2A2CB53C_310E_0014_41C3_AB834B10253B, false, 0, null, null, false); this.setComponentVisibility(this.Container_0A898462_2D0B_4D94_41B3_BDB53B7688EE, true, 0, null, null, false)",
 "fontColor": "#FFFFFF",
 "id": "Button_2A2DA53B_310E_001C_41C7_8885E712C50B",
 "rollOverBackgroundOpacity": 0.8,
 "pressedBackgroundOpacity": 1,
 "width": "100%",
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "iconHeight": 30,
 "layout": "horizontal",
 "shadow": false,
 "verticalAlign": "middle",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadowBlurRadius": 6,
 "minHeight": 1,
 "class": "Button",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "borderColor": "#000000",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "mode": "push",
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "paddingTop": 0,
 "rollOverIconURL": "skin/Button_2A2DA53B_310E_001C_41C7_8885E712C50B_rollover.png",
 "propagateClick": true,
 "height": 50,
 "label": "BACK",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 5,
 "iconURL": "skin/Button_2A2DA53B_310E_001C_41C7_8885E712C50B.png",
 "fontStyle": "italic",
 "textDecoration": "none",
 "iconWidth": 30,
 "horizontalAlign": "left",
 "data": {
  "name": "Button <BACK"
 },
 "fontWeight": "normal",
 "cursor": "hand",
 "iconBeforeLabel": true,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 5
},
{
 "id": "Container_2A2DB53B_310E_001C_41BA_0206228E495C",
 "scrollBarMargin": 2,
 "layout": "absolute",
 "width": "100%",
 "contentOpaque": false,
 "shadow": false,
 "verticalAlign": "top",
 "minHeight": 1,
 "class": "Container",
 "scrollBarWidth": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundOpacity": 0.5,
 "minWidth": 1,
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "gap": 10,
 "paddingTop": 0,
 "propagateClick": true,
 "paddingRight": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarColor": "#000000",
 "height": 1,
 "data": {
  "name": "line"
 },
 "scrollBarOpacity": 0.5,
 "horizontalAlign": "left",
 "scrollBarVisible": "rollOver",
 "overflow": "scroll",
 "backgroundColorDirection": "vertical",
 "paddingLeft": 0
},
{
 "id": "Container_1303E3BB_3106_001D_41C8_60D6F4D70B2F",
 "scrollBarMargin": 2,
 "layout": "absolute",
 "width": "100%",
 "contentOpaque": false,
 "shadow": false,
 "verticalAlign": "top",
 "minHeight": 1,
 "scrollBarWidth": 10,
 "class": "Container",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "gap": 10,
 "paddingTop": 0,
 "propagateClick": true,
 "height": 8,
 "scrollBarColor": "#000000",
 "data": {
  "name": "line separator"
 },
 "scrollBarOpacity": 0.5,
 "horizontalAlign": "left",
 "scrollBarVisible": "rollOver",
 "overflow": "scroll",
 "paddingLeft": 0
},
{
 "rollOverShadowBlurRadius": 18,
 "pressedBackgroundOpacity": 1,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontColor": "#FFFFFF",
 "id": "Button_2A2D853B_310E_001C_41C4_1C2E2BAFC35D",
 "rollOverBackgroundOpacity": 0.8,
 "width": "100%",
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "iconHeight": 32,
 "layout": "horizontal",
 "shadow": false,
 "verticalAlign": "middle",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadowBlurRadius": 15,
 "minHeight": 1,
 "rollOverShadow": false,
 "class": "Button",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "borderColor": "#000000",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "mode": "push",
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "paddingTop": 0,
 "propagateClick": true,
 "height": 36,
 "label": "Main Entrance",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 5,
 "fontStyle": "italic",
 "textDecoration": "none",
 "iconWidth": 32,
 "horizontalAlign": "left",
 "data": {
  "name": "Button text 1"
 },
 "fontWeight": "normal",
 "cursor": "hand",
 "iconBeforeLabel": true,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 10
},
{
 "pressedBackgroundOpacity": 1,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontColor": "#FFFFFF",
 "id": "Button_2A2DE53B_310E_001C_41BB_C7AB6950A4DD",
 "rollOverBackgroundOpacity": 0.8,
 "width": "100%",
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "iconHeight": 32,
 "layout": "horizontal",
 "shadow": false,
 "verticalAlign": "middle",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadowBlurRadius": 6,
 "minHeight": 1,
 "class": "Button",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "borderColor": "#000000",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "mode": "push",
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "paddingTop": 0,
 "propagateClick": true,
 "height": 36,
 "label": "Lobby",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 23,
 "fontStyle": "italic",
 "textDecoration": "none",
 "iconWidth": 32,
 "horizontalAlign": "left",
 "data": {
  "name": "Button text 2"
 },
 "fontWeight": "normal",
 "cursor": "hand",
 "iconBeforeLabel": true,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 10
},
{
 "pressedLabel": "Reception",
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontColor": "#FFFFFF",
 "id": "Button_2A2C253B_310E_001C_41B6_D3A7F4F68C3E",
 "rollOverBackgroundOpacity": 0.8,
 "pressedBackgroundOpacity": 1,
 "width": "100%",
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "iconHeight": 32,
 "layout": "horizontal",
 "shadow": false,
 "verticalAlign": "middle",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadowBlurRadius": 6,
 "minHeight": 1,
 "class": "Button",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "borderColor": "#000000",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "mode": "push",
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "paddingTop": 0,
 "propagateClick": true,
 "height": 36,
 "label": "Reception",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 5,
 "fontStyle": "italic",
 "textDecoration": "none",
 "iconWidth": 32,
 "horizontalAlign": "left",
 "data": {
  "name": "Button text 3"
 },
 "fontWeight": "normal",
 "cursor": "hand",
 "iconBeforeLabel": true,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 10
},
{
 "pressedBackgroundOpacity": 1,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontColor": "#FFFFFF",
 "id": "Button_2A2C053B_310E_001C_41A2_583DE489828C",
 "rollOverBackgroundOpacity": 0.8,
 "width": "100%",
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "iconHeight": 32,
 "layout": "horizontal",
 "shadow": false,
 "verticalAlign": "middle",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadowBlurRadius": 6,
 "minHeight": 1,
 "class": "Button",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "borderColor": "#000000",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "mode": "push",
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "paddingTop": 0,
 "propagateClick": true,
 "height": 36,
 "label": "Meeting Area 1",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 5,
 "fontStyle": "italic",
 "textDecoration": "none",
 "iconWidth": 32,
 "horizontalAlign": "left",
 "data": {
  "name": "Button text 4"
 },
 "fontWeight": "normal",
 "cursor": "hand",
 "iconBeforeLabel": true,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 10
},
{
 "pressedBackgroundOpacity": 1,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontColor": "#FFFFFF",
 "id": "Button_2A2C753B_310E_001C_41C4_B649CCC20E3D",
 "rollOverBackgroundOpacity": 0.8,
 "width": "100%",
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "iconHeight": 32,
 "layout": "horizontal",
 "shadow": false,
 "verticalAlign": "middle",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadowBlurRadius": 6,
 "minHeight": 1,
 "class": "Button",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "borderColor": "#000000",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "mode": "push",
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "paddingTop": 0,
 "propagateClick": true,
 "height": 36,
 "label": "Meeting Area 2",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 5,
 "fontStyle": "italic",
 "textDecoration": "none",
 "iconWidth": 32,
 "horizontalAlign": "left",
 "data": {
  "name": "Button text 5"
 },
 "fontWeight": "normal",
 "cursor": "hand",
 "iconBeforeLabel": true,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 10
},
{
 "pressedBackgroundOpacity": 1,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontColor": "#FFFFFF",
 "id": "Button_2A2C553C_310E_0014_41C4_86393D0ADCC7",
 "rollOverBackgroundOpacity": 0.8,
 "width": "100%",
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "iconHeight": 32,
 "layout": "horizontal",
 "shadow": false,
 "verticalAlign": "middle",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadowBlurRadius": 6,
 "minHeight": 1,
 "class": "Button",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "borderColor": "#000000",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "mode": "push",
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "paddingTop": 0,
 "propagateClick": true,
 "height": 36,
 "label": "Bar",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 5,
 "fontStyle": "italic",
 "textDecoration": "none",
 "iconWidth": 32,
 "horizontalAlign": "left",
 "data": {
  "name": "Button text 6"
 },
 "fontWeight": "normal",
 "cursor": "hand",
 "iconBeforeLabel": true,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 10
},
{
 "pressedBackgroundOpacity": 1,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontColor": "#FFFFFF",
 "id": "Button_15EF2665_3106_0035_41AE_9BACA1A48D02",
 "rollOverBackgroundOpacity": 0.8,
 "width": "100%",
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "iconHeight": 32,
 "layout": "horizontal",
 "shadow": false,
 "verticalAlign": "middle",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadowBlurRadius": 6,
 "minHeight": 1,
 "class": "Button",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "borderColor": "#000000",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "mode": "push",
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "paddingTop": 0,
 "propagateClick": true,
 "height": 36,
 "label": "Chill Out",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 5,
 "fontStyle": "italic",
 "textDecoration": "none",
 "iconWidth": 32,
 "horizontalAlign": "left",
 "data": {
  "name": "Button text 7"
 },
 "fontWeight": "normal",
 "cursor": "hand",
 "iconBeforeLabel": true,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 10
},
{
 "pressedBackgroundOpacity": 1,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontColor": "#FFFFFF",
 "id": "Button_15F5A318_3106_001C_41C5_9AA2EF2184CF",
 "rollOverBackgroundOpacity": 0.8,
 "width": "100%",
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "iconHeight": 32,
 "layout": "horizontal",
 "shadow": false,
 "verticalAlign": "middle",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadowBlurRadius": 6,
 "minHeight": 1,
 "class": "Button",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "borderColor": "#000000",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "mode": "push",
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "paddingTop": 0,
 "propagateClick": true,
 "height": 36,
 "label": "Terrace",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 5,
 "fontStyle": "italic",
 "textDecoration": "none",
 "iconWidth": 32,
 "horizontalAlign": "left",
 "data": {
  "name": "Button text 8"
 },
 "fontWeight": "normal",
 "cursor": "hand",
 "iconBeforeLabel": true,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 10
},
{
 "pressedBackgroundOpacity": 1,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontColor": "#FFFFFF",
 "id": "Button_1203FDB8_3106_001C_41B6_C9BE8EDD0DA9",
 "rollOverBackgroundOpacity": 0.8,
 "width": "100%",
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "iconHeight": 32,
 "layout": "horizontal",
 "shadow": false,
 "verticalAlign": "middle",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadowBlurRadius": 6,
 "minHeight": 1,
 "class": "Button",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "borderColor": "#000000",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "mode": "push",
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "paddingTop": 0,
 "propagateClick": true,
 "height": 36,
 "label": "Garden",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 5,
 "fontStyle": "italic",
 "textDecoration": "none",
 "iconWidth": 32,
 "visible": false,
 "horizontalAlign": "left",
 "data": {
  "name": "Button text 9"
 },
 "fontWeight": "normal",
 "cursor": "hand",
 "iconBeforeLabel": true,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 0
},
{
 "pressedBackgroundOpacity": 1,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontColor": "#FFFFFF",
 "id": "Button_13D4FC1E_310A_0017_41BA_DDA6D071C1BA",
 "pressedBackgroundColor": [
  "#000000"
 ],
 "width": "100%",
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "iconHeight": 32,
 "rollOverBackgroundOpacity": 0.8,
 "shadow": false,
 "verticalAlign": "middle",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadowBlurRadius": 6,
 "minHeight": 1,
 "class": "Button",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "borderColor": "#000000",
 "paddingRight": 0,
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "minWidth": 1,
 "mode": "push",
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "pressedBackgroundColorRatios": [
  0
 ],
 "paddingTop": 0,
 "propagateClick": true,
 "height": 36,
 "label": "Lorem Ipsum",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 5,
 "fontStyle": "italic",
 "textDecoration": "none",
 "iconWidth": 32,
 "visible": false,
 "horizontalAlign": "left",
 "data": {
  "name": "Button text 10"
 },
 "fontWeight": "normal",
 "cursor": "hand",
 "iconBeforeLabel": true,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 0
},
{
 "rollOverFontFamily": "Oswald",
 "rollOverFontSize": 18,
 "click": "this.setComponentVisibility(this.Container_159EADDD_31FA_0014_41C8_8A5203EC627B, false, 0, null, null, false); this.setComponentVisibility(this.Container_0A898462_2D0B_4D94_41B3_BDB53B7688EE, true, 0, null, null, false)",
 "fontColor": "#FFFFFF",
 "id": "Button_15A15DDC_31FA_0014_41A4_CE4305FEC7D1",
 "rollOverBackgroundOpacity": 0.8,
 "pressedBackgroundOpacity": 1,
 "width": "100%",
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "iconHeight": 30,
 "layout": "horizontal",
 "shadow": false,
 "verticalAlign": "middle",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadowBlurRadius": 6,
 "minHeight": 1,
 "class": "Button",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "borderColor": "#000000",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "mode": "push",
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "paddingTop": 0,
 "rollOverIconURL": "skin/Button_15A15DDC_31FA_0014_41A4_CE4305FEC7D1_rollover.png",
 "propagateClick": true,
 "height": 50,
 "label": "BACK",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 5,
 "iconURL": "skin/Button_15A15DDC_31FA_0014_41A4_CE4305FEC7D1.png",
 "fontStyle": "italic",
 "textDecoration": "none",
 "iconWidth": 30,
 "horizontalAlign": "left",
 "data": {
  "name": "Button <BACK"
 },
 "fontWeight": "normal",
 "cursor": "hand",
 "iconBeforeLabel": true,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 5
},
{
 "id": "Container_15A14DDC_31FA_0014_41BE_C93192DD207E",
 "scrollBarMargin": 2,
 "layout": "absolute",
 "width": "100%",
 "contentOpaque": false,
 "shadow": false,
 "verticalAlign": "top",
 "minHeight": 1,
 "class": "Container",
 "scrollBarWidth": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundOpacity": 0.5,
 "minWidth": 1,
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "gap": 10,
 "paddingTop": 0,
 "propagateClick": true,
 "paddingRight": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarColor": "#000000",
 "height": 1,
 "data": {
  "name": "line"
 },
 "scrollBarOpacity": 0.5,
 "horizontalAlign": "left",
 "scrollBarVisible": "rollOver",
 "overflow": "scroll",
 "backgroundColorDirection": "vertical",
 "paddingLeft": 0
},
{
 "id": "Container_15A16DDC_31FA_0014_4199_0FBF7553300D",
 "scrollBarMargin": 2,
 "layout": "absolute",
 "width": "100%",
 "contentOpaque": false,
 "shadow": false,
 "verticalAlign": "top",
 "minHeight": 1,
 "scrollBarWidth": 10,
 "class": "Container",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "gap": 10,
 "paddingTop": 0,
 "propagateClick": true,
 "height": 8,
 "scrollBarColor": "#000000",
 "data": {
  "name": "line separator"
 },
 "scrollBarOpacity": 0.5,
 "horizontalAlign": "left",
 "scrollBarVisible": "rollOver",
 "overflow": "scroll",
 "paddingLeft": 0
},
{
 "rollOverShadowBlurRadius": 18,
 "pressedBackgroundOpacity": 1,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontColor": "#FFFFFF",
 "id": "Button_15A10DDC_31FA_0014_4185_021C898E177D",
 "rollOverBackgroundOpacity": 0.8,
 "width": "100%",
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "iconHeight": 32,
 "layout": "horizontal",
 "shadow": false,
 "verticalAlign": "middle",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadowBlurRadius": 15,
 "minHeight": 1,
 "rollOverShadow": false,
 "class": "Button",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "borderColor": "#000000",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "mode": "push",
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "paddingTop": 0,
 "propagateClick": true,
 "height": 36,
 "label": "Lorem Ipsum",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 5,
 "fontStyle": "italic",
 "textDecoration": "none",
 "iconWidth": 32,
 "horizontalAlign": "left",
 "data": {
  "name": "Button text 1"
 },
 "fontWeight": "normal",
 "cursor": "hand",
 "iconBeforeLabel": true,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 10
},
{
 "pressedBackgroundOpacity": 1,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontColor": "#FFFFFF",
 "id": "Button_15A13DDC_31FA_0014_41C5_41AE80876834",
 "rollOverBackgroundOpacity": 0.8,
 "width": "100%",
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "iconHeight": 32,
 "layout": "horizontal",
 "shadow": false,
 "verticalAlign": "middle",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadowBlurRadius": 6,
 "minHeight": 1,
 "class": "Button",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "borderColor": "#000000",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "mode": "push",
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "paddingTop": 0,
 "propagateClick": true,
 "height": 36,
 "label": "Lorem Ipsum",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 23,
 "fontStyle": "italic",
 "textDecoration": "none",
 "iconWidth": 32,
 "horizontalAlign": "left",
 "data": {
  "name": "Button text 2"
 },
 "fontWeight": "normal",
 "cursor": "hand",
 "iconBeforeLabel": true,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 10
},
{
 "pressedLabel": "Lorem Ipsum",
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontColor": "#FFFFFF",
 "id": "Button_15A12DDC_31FA_0014_416B_ED845741AE5F",
 "rollOverBackgroundOpacity": 0.8,
 "pressedBackgroundOpacity": 1,
 "width": "100%",
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "iconHeight": 32,
 "layout": "horizontal",
 "shadow": false,
 "verticalAlign": "middle",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadowBlurRadius": 6,
 "minHeight": 1,
 "class": "Button",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "borderColor": "#000000",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "mode": "push",
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "paddingTop": 0,
 "propagateClick": true,
 "height": 36,
 "label": "Lorem Ipsum",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 5,
 "fontStyle": "italic",
 "textDecoration": "none",
 "iconWidth": 32,
 "horizontalAlign": "left",
 "data": {
  "name": "Button text 3"
 },
 "fontWeight": "normal",
 "cursor": "hand",
 "iconBeforeLabel": true,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 10
},
{
 "pressedBackgroundOpacity": 1,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontColor": "#FFFFFF",
 "id": "Button_159EDDDC_31FA_0014_419A_61C18E43FE01",
 "rollOverBackgroundOpacity": 0.8,
 "width": "100%",
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "iconHeight": 32,
 "layout": "horizontal",
 "shadow": false,
 "verticalAlign": "middle",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadowBlurRadius": 6,
 "minHeight": 1,
 "class": "Button",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "borderColor": "#000000",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "mode": "push",
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "paddingTop": 0,
 "propagateClick": true,
 "height": 36,
 "label": "Lorem Ipsum",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 5,
 "fontStyle": "italic",
 "textDecoration": "none",
 "iconWidth": 32,
 "horizontalAlign": "left",
 "data": {
  "name": "Button text 4"
 },
 "fontWeight": "normal",
 "cursor": "hand",
 "iconBeforeLabel": true,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 10
},
{
 "pressedBackgroundOpacity": 1,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontColor": "#FFFFFF",
 "id": "Button_159ECDDC_31FA_0014_41B9_2D5AB1021813",
 "rollOverBackgroundOpacity": 0.8,
 "width": "100%",
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "iconHeight": 32,
 "layout": "horizontal",
 "shadow": false,
 "verticalAlign": "middle",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadowBlurRadius": 6,
 "minHeight": 1,
 "class": "Button",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "borderColor": "#000000",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "mode": "push",
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "paddingTop": 0,
 "propagateClick": true,
 "height": 36,
 "label": "Lorem Ipsum",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 5,
 "fontStyle": "italic",
 "textDecoration": "none",
 "iconWidth": 32,
 "horizontalAlign": "left",
 "data": {
  "name": "Button text 5"
 },
 "fontWeight": "normal",
 "cursor": "hand",
 "iconBeforeLabel": true,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 10
},
{
 "pressedBackgroundOpacity": 1,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontColor": "#FFFFFF",
 "id": "Button_159EFDDC_31FA_0014_41C6_9CF7032F84E0",
 "rollOverBackgroundOpacity": 0.8,
 "width": "100%",
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "iconHeight": 32,
 "layout": "horizontal",
 "shadow": false,
 "verticalAlign": "middle",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadowBlurRadius": 6,
 "minHeight": 1,
 "class": "Button",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "borderColor": "#000000",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "mode": "push",
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "paddingTop": 0,
 "propagateClick": true,
 "height": 36,
 "label": "Lorem ipsum",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 5,
 "fontStyle": "italic",
 "textDecoration": "none",
 "iconWidth": 32,
 "horizontalAlign": "left",
 "data": {
  "name": "Button text 6"
 },
 "fontWeight": "normal",
 "cursor": "hand",
 "iconBeforeLabel": true,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 10
},
{
 "pressedBackgroundOpacity": 1,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontColor": "#FFFFFF",
 "id": "Button_159EEDDC_31FA_0014_41B6_22A86B2D2FEB",
 "rollOverBackgroundOpacity": 0.8,
 "width": "100%",
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "iconHeight": 32,
 "layout": "horizontal",
 "shadow": false,
 "verticalAlign": "middle",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadowBlurRadius": 6,
 "minHeight": 1,
 "class": "Button",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "borderColor": "#000000",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "mode": "push",
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "paddingTop": 0,
 "propagateClick": true,
 "height": 36,
 "label": "Lorem Ipsum",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 5,
 "fontStyle": "italic",
 "textDecoration": "none",
 "iconWidth": 32,
 "horizontalAlign": "left",
 "data": {
  "name": "Button text 7"
 },
 "fontWeight": "normal",
 "cursor": "hand",
 "iconBeforeLabel": true,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 10
},
{
 "pressedBackgroundOpacity": 1,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontColor": "#FFFFFF",
 "id": "Button_159E9DDC_31FA_0015_41B6_CB1D433C7673",
 "rollOverBackgroundOpacity": 0.8,
 "width": "100%",
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "iconHeight": 32,
 "layout": "horizontal",
 "shadow": false,
 "verticalAlign": "middle",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadowBlurRadius": 6,
 "minHeight": 1,
 "class": "Button",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "borderColor": "#000000",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "mode": "push",
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "paddingTop": 0,
 "propagateClick": true,
 "height": 36,
 "label": "Lorem Ipsum",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 5,
 "fontStyle": "italic",
 "textDecoration": "none",
 "iconWidth": 32,
 "horizontalAlign": "left",
 "data": {
  "name": "Button text 8"
 },
 "fontWeight": "normal",
 "cursor": "hand",
 "iconBeforeLabel": true,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 10
},
{
 "pressedBackgroundOpacity": 1,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontColor": "#FFFFFF",
 "id": "Button_159E8DDD_31FA_0014_41C5_F18F441AF371",
 "rollOverBackgroundOpacity": 0.8,
 "width": "100%",
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "iconHeight": 32,
 "layout": "horizontal",
 "shadow": false,
 "verticalAlign": "middle",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadowBlurRadius": 6,
 "minHeight": 1,
 "class": "Button",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "borderColor": "#000000",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "mode": "push",
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "paddingTop": 0,
 "propagateClick": true,
 "height": 36,
 "label": "Lorem Ipsum",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 5,
 "fontStyle": "italic",
 "textDecoration": "none",
 "iconWidth": 32,
 "horizontalAlign": "left",
 "data": {
  "name": "Button text 9"
 },
 "fontWeight": "normal",
 "cursor": "hand",
 "iconBeforeLabel": true,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 10
},
{
 "pressedBackgroundOpacity": 1,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontColor": "#FFFFFF",
 "id": "Button_159EBDDD_31FA_0014_41C8_935504B30727",
 "pressedBackgroundColor": [
  "#000000"
 ],
 "width": "100%",
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "iconHeight": 32,
 "rollOverBackgroundOpacity": 0.8,
 "shadow": false,
 "verticalAlign": "middle",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadowBlurRadius": 6,
 "minHeight": 1,
 "class": "Button",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "borderColor": "#000000",
 "paddingRight": 0,
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "minWidth": 1,
 "mode": "push",
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "pressedBackgroundColorRatios": [
  0
 ],
 "paddingTop": 0,
 "propagateClick": true,
 "height": 36,
 "label": "Lorem Ipsum",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 5,
 "fontStyle": "italic",
 "textDecoration": "none",
 "iconWidth": 32,
 "horizontalAlign": "left",
 "data": {
  "name": "Button text 10"
 },
 "fontWeight": "normal",
 "cursor": "hand",
 "iconBeforeLabel": true,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 10
},
{
 "rollOverFontFamily": "Oswald",
 "rollOverFontSize": 18,
 "click": "this.setComponentVisibility(this.Container_17569D7D_31FA_0015_41C4_CBC688763A8D, false, 0, null, null, false); this.setComponentVisibility(this.Container_0A898462_2D0B_4D94_41B3_BDB53B7688EE, true, 0, null, null, false)",
 "fontColor": "#FFFFFF",
 "id": "Button_1757CD7D_31FA_0015_4143_A9E37B16A50B",
 "rollOverBackgroundOpacity": 0.8,
 "pressedBackgroundOpacity": 1,
 "width": "100%",
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "iconHeight": 30,
 "layout": "horizontal",
 "shadow": false,
 "verticalAlign": "middle",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadowBlurRadius": 6,
 "minHeight": 1,
 "class": "Button",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "borderColor": "#000000",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "mode": "push",
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "paddingTop": 0,
 "rollOverIconURL": "skin/Button_1757CD7D_31FA_0015_4143_A9E37B16A50B_rollover.png",
 "propagateClick": true,
 "height": 50,
 "label": "BACK",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 5,
 "iconURL": "skin/Button_1757CD7D_31FA_0015_4143_A9E37B16A50B.png",
 "fontStyle": "italic",
 "textDecoration": "none",
 "iconWidth": 30,
 "horizontalAlign": "left",
 "data": {
  "name": "Button <BACK"
 },
 "fontWeight": "normal",
 "cursor": "hand",
 "iconBeforeLabel": true,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 5
},
{
 "id": "Container_17579D7D_31FA_0015_41A1_D2B94269F28D",
 "scrollBarMargin": 2,
 "layout": "absolute",
 "width": "100%",
 "contentOpaque": false,
 "shadow": false,
 "verticalAlign": "top",
 "minHeight": 1,
 "class": "Container",
 "scrollBarWidth": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundOpacity": 0.5,
 "minWidth": 1,
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "gap": 10,
 "paddingTop": 0,
 "propagateClick": true,
 "paddingRight": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarColor": "#000000",
 "height": 1,
 "data": {
  "name": "line"
 },
 "scrollBarOpacity": 0.5,
 "horizontalAlign": "left",
 "scrollBarVisible": "rollOver",
 "overflow": "scroll",
 "backgroundColorDirection": "vertical",
 "paddingLeft": 0
},
{
 "id": "Container_17578D7D_31FA_0015_41BE_353D3005648A",
 "scrollBarMargin": 2,
 "layout": "absolute",
 "width": "100%",
 "contentOpaque": false,
 "shadow": false,
 "verticalAlign": "top",
 "minHeight": 1,
 "scrollBarWidth": 10,
 "class": "Container",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "gap": 10,
 "paddingTop": 0,
 "propagateClick": true,
 "height": 8,
 "scrollBarColor": "#000000",
 "data": {
  "name": "line separator"
 },
 "scrollBarOpacity": 0.5,
 "horizontalAlign": "left",
 "scrollBarVisible": "rollOver",
 "overflow": "scroll",
 "paddingLeft": 0
},
{
 "rollOverShadowBlurRadius": 18,
 "pressedBackgroundOpacity": 1,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontColor": "#FFFFFF",
 "id": "Button_1757AD7D_31FA_0015_41C7_FB79F56FA149",
 "rollOverBackgroundOpacity": 0.8,
 "width": "100%",
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "iconHeight": 32,
 "layout": "horizontal",
 "shadow": false,
 "verticalAlign": "middle",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadowBlurRadius": 15,
 "minHeight": 1,
 "rollOverShadow": false,
 "class": "Button",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "borderColor": "#000000",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "mode": "push",
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "paddingTop": 0,
 "propagateClick": true,
 "height": 36,
 "label": "Lorem Ipsum",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 5,
 "fontStyle": "italic",
 "textDecoration": "none",
 "iconWidth": 32,
 "horizontalAlign": "left",
 "data": {
  "name": "Button text 1"
 },
 "fontWeight": "normal",
 "cursor": "hand",
 "iconBeforeLabel": true,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 10
},
{
 "pressedBackgroundOpacity": 1,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontColor": "#FFFFFF",
 "id": "Button_17565D7D_31FA_0015_4193_78BBCB2DC70F",
 "rollOverBackgroundOpacity": 0.8,
 "width": "100%",
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "iconHeight": 32,
 "layout": "horizontal",
 "shadow": false,
 "verticalAlign": "middle",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadowBlurRadius": 6,
 "minHeight": 1,
 "class": "Button",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "borderColor": "#000000",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "mode": "push",
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "paddingTop": 0,
 "propagateClick": true,
 "height": 36,
 "label": "Lorem Ipsum",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 23,
 "fontStyle": "italic",
 "textDecoration": "none",
 "iconWidth": 32,
 "horizontalAlign": "left",
 "data": {
  "name": "Button text 2"
 },
 "fontWeight": "normal",
 "cursor": "hand",
 "iconBeforeLabel": true,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 10
},
{
 "pressedLabel": "Lorem Ipsum",
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontColor": "#FFFFFF",
 "id": "Button_17564D7D_31FA_0015_41B8_A9191CD56C52",
 "rollOverBackgroundOpacity": 0.8,
 "pressedBackgroundOpacity": 1,
 "width": "100%",
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "iconHeight": 32,
 "layout": "horizontal",
 "shadow": false,
 "verticalAlign": "middle",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadowBlurRadius": 6,
 "minHeight": 1,
 "class": "Button",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "borderColor": "#000000",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "mode": "push",
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "paddingTop": 0,
 "propagateClick": true,
 "height": 36,
 "label": "Lorem Ipsum",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 5,
 "fontStyle": "italic",
 "textDecoration": "none",
 "iconWidth": 32,
 "horizontalAlign": "left",
 "data": {
  "name": "Button text 3"
 },
 "fontWeight": "normal",
 "cursor": "hand",
 "iconBeforeLabel": true,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 10
},
{
 "pressedBackgroundOpacity": 1,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontColor": "#FFFFFF",
 "id": "Button_17567D7D_31FA_0015_41C2_1E0D0AF05C7A",
 "rollOverBackgroundOpacity": 0.8,
 "width": "100%",
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "iconHeight": 32,
 "layout": "horizontal",
 "shadow": false,
 "verticalAlign": "middle",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadowBlurRadius": 6,
 "minHeight": 1,
 "class": "Button",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "borderColor": "#000000",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "mode": "push",
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "paddingTop": 0,
 "propagateClick": true,
 "height": 36,
 "label": "Lorem Ipsum",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 5,
 "fontStyle": "italic",
 "textDecoration": "none",
 "iconWidth": 32,
 "horizontalAlign": "left",
 "data": {
  "name": "Button text 4"
 },
 "fontWeight": "normal",
 "cursor": "hand",
 "iconBeforeLabel": true,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 10
},
{
 "pressedBackgroundOpacity": 1,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontColor": "#FFFFFF",
 "id": "Button_17566D7D_31FA_0015_41AD_98D7C60C694F",
 "rollOverBackgroundOpacity": 0.8,
 "width": "100%",
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "iconHeight": 32,
 "layout": "horizontal",
 "shadow": false,
 "verticalAlign": "middle",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadowBlurRadius": 6,
 "minHeight": 1,
 "class": "Button",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "borderColor": "#000000",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "mode": "push",
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "paddingTop": 0,
 "propagateClick": true,
 "height": 36,
 "label": "Lorem Ipsum",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 5,
 "fontStyle": "italic",
 "textDecoration": "none",
 "iconWidth": 32,
 "horizontalAlign": "left",
 "data": {
  "name": "Button text 5"
 },
 "fontWeight": "normal",
 "cursor": "hand",
 "iconBeforeLabel": true,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 10
},
{
 "pressedBackgroundOpacity": 1,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontColor": "#FFFFFF",
 "id": "Button_17561D7D_31FA_0015_41B5_BD72FAC26B8B",
 "rollOverBackgroundOpacity": 0.8,
 "width": "100%",
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "iconHeight": 32,
 "layout": "horizontal",
 "shadow": false,
 "verticalAlign": "middle",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadowBlurRadius": 6,
 "minHeight": 1,
 "class": "Button",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "borderColor": "#000000",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "mode": "push",
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "paddingTop": 0,
 "propagateClick": true,
 "height": 36,
 "label": "Lorem ipsum",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 5,
 "fontStyle": "italic",
 "textDecoration": "none",
 "iconWidth": 32,
 "horizontalAlign": "left",
 "data": {
  "name": "Button text 6"
 },
 "fontWeight": "normal",
 "cursor": "hand",
 "iconBeforeLabel": true,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 10
},
{
 "pressedBackgroundOpacity": 1,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontColor": "#FFFFFF",
 "id": "Button_17560D7D_31FA_0015_41C4_7F0EC7540CC2",
 "rollOverBackgroundOpacity": 0.8,
 "width": "100%",
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "iconHeight": 32,
 "layout": "horizontal",
 "shadow": false,
 "verticalAlign": "middle",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadowBlurRadius": 6,
 "minHeight": 1,
 "class": "Button",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "borderColor": "#000000",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "mode": "push",
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "paddingTop": 0,
 "propagateClick": true,
 "height": 36,
 "label": "Lorem Ipsum",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 5,
 "fontStyle": "italic",
 "textDecoration": "none",
 "iconWidth": 32,
 "horizontalAlign": "left",
 "data": {
  "name": "Button text 7"
 },
 "fontWeight": "normal",
 "cursor": "hand",
 "iconBeforeLabel": true,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 10
},
{
 "pressedBackgroundOpacity": 1,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontColor": "#FFFFFF",
 "id": "Button_17562D7D_31FA_0015_41A3_96B282B30DBA",
 "rollOverBackgroundOpacity": 0.8,
 "width": "100%",
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "iconHeight": 32,
 "layout": "horizontal",
 "shadow": false,
 "verticalAlign": "middle",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadowBlurRadius": 6,
 "minHeight": 1,
 "class": "Button",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "borderColor": "#000000",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "mode": "push",
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "paddingTop": 0,
 "propagateClick": true,
 "height": 36,
 "label": "Lorem Ipsum",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 5,
 "fontStyle": "italic",
 "textDecoration": "none",
 "iconWidth": 32,
 "horizontalAlign": "left",
 "data": {
  "name": "Button text 8"
 },
 "fontWeight": "normal",
 "cursor": "hand",
 "iconBeforeLabel": true,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 10
},
{
 "pressedBackgroundOpacity": 1,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontColor": "#FFFFFF",
 "id": "Button_1756DD7D_31FA_0015_41A5_988B67FCF8B7",
 "rollOverBackgroundOpacity": 0.8,
 "width": "100%",
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "iconHeight": 32,
 "layout": "horizontal",
 "shadow": false,
 "verticalAlign": "middle",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadowBlurRadius": 6,
 "minHeight": 1,
 "class": "Button",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "borderColor": "#000000",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "mode": "push",
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "paddingTop": 0,
 "propagateClick": true,
 "height": 36,
 "label": "Lorem Ipsum",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 5,
 "fontStyle": "italic",
 "textDecoration": "none",
 "iconWidth": 32,
 "horizontalAlign": "left",
 "data": {
  "name": "Button text 9"
 },
 "fontWeight": "normal",
 "cursor": "hand",
 "iconBeforeLabel": true,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 10
},
{
 "pressedBackgroundOpacity": 1,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontColor": "#FFFFFF",
 "id": "Button_1756FD7D_31FA_0015_41C7_DA2AAC2AAAEC",
 "pressedBackgroundColor": [
  "#000000"
 ],
 "width": "100%",
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "iconHeight": 32,
 "rollOverBackgroundOpacity": 0.8,
 "shadow": false,
 "verticalAlign": "middle",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadowBlurRadius": 6,
 "minHeight": 1,
 "class": "Button",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "borderColor": "#000000",
 "paddingRight": 0,
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "minWidth": 1,
 "mode": "push",
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "pressedBackgroundColorRatios": [
  0
 ],
 "paddingTop": 0,
 "propagateClick": true,
 "height": 36,
 "label": "Lorem Ipsum",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 5,
 "fontStyle": "italic",
 "textDecoration": "none",
 "iconWidth": 32,
 "horizontalAlign": "left",
 "data": {
  "name": "Button text 10"
 },
 "fontWeight": "normal",
 "cursor": "hand",
 "iconBeforeLabel": true,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 10
},
{
 "rollOverFontFamily": "Oswald",
 "rollOverFontSize": 18,
 "click": "this.setComponentVisibility(this.Container_1758A215_31FA_0014_41B6_9A4A5384548B, false, 0, null, null, false); this.setComponentVisibility(this.Container_0A898462_2D0B_4D94_41B3_BDB53B7688EE, true, 0, null, null, false)",
 "fontColor": "#FFFFFF",
 "id": "Button_175A5214_31FA_0014_4198_930DF49BADD9",
 "rollOverBackgroundOpacity": 0.8,
 "pressedBackgroundOpacity": 1,
 "width": "100%",
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "iconHeight": 30,
 "layout": "horizontal",
 "shadow": false,
 "verticalAlign": "middle",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadowBlurRadius": 6,
 "minHeight": 1,
 "class": "Button",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "borderColor": "#000000",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "mode": "push",
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "paddingTop": 0,
 "rollOverIconURL": "skin/Button_175A5214_31FA_0014_4198_930DF49BADD9_rollover.png",
 "propagateClick": true,
 "height": 50,
 "label": "BACK",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 5,
 "iconURL": "skin/Button_175A5214_31FA_0014_4198_930DF49BADD9.png",
 "fontStyle": "italic",
 "textDecoration": "none",
 "iconWidth": 30,
 "horizontalAlign": "left",
 "data": {
  "name": "Button <BACK"
 },
 "fontWeight": "normal",
 "cursor": "hand",
 "iconBeforeLabel": true,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 5
},
{
 "id": "Container_175A4215_31FA_0014_41B2_5B8676CC3F2F",
 "scrollBarMargin": 2,
 "layout": "absolute",
 "width": "100%",
 "contentOpaque": false,
 "shadow": false,
 "verticalAlign": "top",
 "minHeight": 1,
 "class": "Container",
 "scrollBarWidth": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundOpacity": 0.5,
 "minWidth": 1,
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "gap": 10,
 "paddingTop": 0,
 "propagateClick": true,
 "paddingRight": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarColor": "#000000",
 "height": 1,
 "data": {
  "name": "line"
 },
 "scrollBarOpacity": 0.5,
 "horizontalAlign": "left",
 "scrollBarVisible": "rollOver",
 "overflow": "scroll",
 "backgroundColorDirection": "vertical",
 "paddingLeft": 0
},
{
 "id": "Container_1759B215_31FA_0014_41C0_84C99CBD5517",
 "scrollBarMargin": 2,
 "layout": "absolute",
 "width": "100%",
 "contentOpaque": false,
 "shadow": false,
 "verticalAlign": "top",
 "minHeight": 1,
 "scrollBarWidth": 10,
 "class": "Container",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "gap": 10,
 "paddingTop": 0,
 "propagateClick": true,
 "height": 8,
 "scrollBarColor": "#000000",
 "data": {
  "name": "line separator"
 },
 "scrollBarOpacity": 0.5,
 "horizontalAlign": "left",
 "scrollBarVisible": "rollOver",
 "overflow": "scroll",
 "paddingLeft": 0
},
{
 "rollOverShadowBlurRadius": 18,
 "pressedBackgroundOpacity": 1,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontColor": "#FFFFFF",
 "id": "Button_1759A215_31FA_0014_41C7_F6B1044E5BB3",
 "rollOverBackgroundOpacity": 0.8,
 "width": "100%",
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "iconHeight": 32,
 "layout": "horizontal",
 "shadow": false,
 "verticalAlign": "middle",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadowBlurRadius": 15,
 "minHeight": 1,
 "rollOverShadow": false,
 "class": "Button",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "borderColor": "#000000",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "mode": "push",
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "paddingTop": 0,
 "propagateClick": true,
 "height": 36,
 "label": "Lorem Ipsum",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 5,
 "fontStyle": "italic",
 "textDecoration": "none",
 "iconWidth": 32,
 "horizontalAlign": "left",
 "data": {
  "name": "Button text 1"
 },
 "fontWeight": "normal",
 "cursor": "hand",
 "iconBeforeLabel": true,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 10
},
{
 "pressedBackgroundOpacity": 1,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontColor": "#FFFFFF",
 "id": "Button_17598215_31FA_0014_41AC_1166AB319171",
 "rollOverBackgroundOpacity": 0.8,
 "width": "100%",
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "iconHeight": 32,
 "layout": "horizontal",
 "shadow": false,
 "verticalAlign": "middle",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadowBlurRadius": 6,
 "minHeight": 1,
 "class": "Button",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "borderColor": "#000000",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "mode": "push",
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "paddingTop": 0,
 "propagateClick": true,
 "height": 36,
 "label": "Lorem Ipsum",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 23,
 "fontStyle": "italic",
 "textDecoration": "none",
 "iconWidth": 32,
 "horizontalAlign": "left",
 "data": {
  "name": "Button text 2"
 },
 "fontWeight": "normal",
 "cursor": "hand",
 "iconBeforeLabel": true,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 10
},
{
 "pressedLabel": "Lorem Ipsum",
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontColor": "#FFFFFF",
 "id": "Button_1759F215_31FA_0014_41BD_BBFA5FB0D882",
 "rollOverBackgroundOpacity": 0.8,
 "pressedBackgroundOpacity": 1,
 "width": "100%",
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "iconHeight": 32,
 "layout": "horizontal",
 "shadow": false,
 "verticalAlign": "middle",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadowBlurRadius": 6,
 "minHeight": 1,
 "class": "Button",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "borderColor": "#000000",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "mode": "push",
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "paddingTop": 0,
 "propagateClick": true,
 "height": 36,
 "label": "Lorem Ipsum",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 5,
 "fontStyle": "italic",
 "textDecoration": "none",
 "iconWidth": 32,
 "horizontalAlign": "left",
 "data": {
  "name": "Button text 3"
 },
 "fontWeight": "normal",
 "cursor": "hand",
 "iconBeforeLabel": true,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 10
},
{
 "pressedBackgroundOpacity": 1,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontColor": "#FFFFFF",
 "id": "Button_1759D215_31FA_0014_41AD_B6C5744A0B97",
 "rollOverBackgroundOpacity": 0.8,
 "width": "100%",
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "iconHeight": 32,
 "layout": "horizontal",
 "shadow": false,
 "verticalAlign": "middle",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadowBlurRadius": 6,
 "minHeight": 1,
 "class": "Button",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "borderColor": "#000000",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "mode": "push",
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "paddingTop": 0,
 "propagateClick": true,
 "height": 36,
 "label": "Lorem Ipsum",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 5,
 "fontStyle": "italic",
 "textDecoration": "none",
 "iconWidth": 32,
 "horizontalAlign": "left",
 "data": {
  "name": "Button text 4"
 },
 "fontWeight": "normal",
 "cursor": "hand",
 "iconBeforeLabel": true,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 10
},
{
 "pressedBackgroundOpacity": 1,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontColor": "#FFFFFF",
 "id": "Button_17593215_31FA_0014_41C0_42BAFB0080F0",
 "rollOverBackgroundOpacity": 0.8,
 "width": "100%",
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "iconHeight": 32,
 "layout": "horizontal",
 "shadow": false,
 "verticalAlign": "middle",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadowBlurRadius": 6,
 "minHeight": 1,
 "class": "Button",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "borderColor": "#000000",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "mode": "push",
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "paddingTop": 0,
 "propagateClick": true,
 "height": 36,
 "label": "Lorem Ipsum",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 5,
 "fontStyle": "italic",
 "textDecoration": "none",
 "iconWidth": 32,
 "horizontalAlign": "left",
 "data": {
  "name": "Button text 5"
 },
 "fontWeight": "normal",
 "cursor": "hand",
 "iconBeforeLabel": true,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 10
},
{
 "pressedBackgroundOpacity": 1,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontColor": "#FFFFFF",
 "id": "Button_17592215_31FA_0014_41B2_AA3B5CC318B8",
 "rollOverBackgroundOpacity": 0.8,
 "width": "100%",
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "iconHeight": 32,
 "layout": "horizontal",
 "shadow": false,
 "verticalAlign": "middle",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadowBlurRadius": 6,
 "minHeight": 1,
 "class": "Button",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "borderColor": "#000000",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "mode": "push",
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "paddingTop": 0,
 "propagateClick": true,
 "height": 36,
 "label": "Lorem ipsum",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 5,
 "fontStyle": "italic",
 "textDecoration": "none",
 "iconWidth": 32,
 "horizontalAlign": "left",
 "data": {
  "name": "Button text 6"
 },
 "fontWeight": "normal",
 "cursor": "hand",
 "iconBeforeLabel": true,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 10
},
{
 "pressedBackgroundOpacity": 1,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontColor": "#FFFFFF",
 "id": "Button_17590215_31FA_0014_41C1_2B2D012DCC76",
 "rollOverBackgroundOpacity": 0.8,
 "width": "100%",
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "iconHeight": 32,
 "layout": "horizontal",
 "shadow": false,
 "verticalAlign": "middle",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadowBlurRadius": 6,
 "minHeight": 1,
 "class": "Button",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "borderColor": "#000000",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "mode": "push",
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "paddingTop": 0,
 "propagateClick": true,
 "height": 36,
 "label": "Lorem Ipsum",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 5,
 "fontStyle": "italic",
 "textDecoration": "none",
 "iconWidth": 32,
 "horizontalAlign": "left",
 "data": {
  "name": "Button text 7"
 },
 "fontWeight": "normal",
 "cursor": "hand",
 "iconBeforeLabel": true,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 10
},
{
 "pressedBackgroundOpacity": 1,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontColor": "#FFFFFF",
 "id": "Button_17597215_31FA_0014_41C0_9BEE1DE4D7F6",
 "rollOverBackgroundOpacity": 0.8,
 "width": "100%",
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "iconHeight": 32,
 "layout": "horizontal",
 "shadow": false,
 "verticalAlign": "middle",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadowBlurRadius": 6,
 "minHeight": 1,
 "class": "Button",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "borderColor": "#000000",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "mode": "push",
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "paddingTop": 0,
 "propagateClick": true,
 "height": 36,
 "label": "Lorem Ipsum",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 5,
 "fontStyle": "italic",
 "textDecoration": "none",
 "iconWidth": 32,
 "horizontalAlign": "left",
 "data": {
  "name": "Button text 8"
 },
 "fontWeight": "normal",
 "cursor": "hand",
 "iconBeforeLabel": true,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 10
},
{
 "pressedBackgroundOpacity": 1,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontColor": "#FFFFFF",
 "id": "Button_17596215_31FA_0014_41C6_A42670770708",
 "rollOverBackgroundOpacity": 0.8,
 "width": "100%",
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "iconHeight": 32,
 "layout": "horizontal",
 "shadow": false,
 "verticalAlign": "middle",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadowBlurRadius": 6,
 "minHeight": 1,
 "class": "Button",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "borderColor": "#000000",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "mode": "push",
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "paddingTop": 0,
 "propagateClick": true,
 "height": 36,
 "label": "Lorem Ipsum",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 5,
 "fontStyle": "italic",
 "textDecoration": "none",
 "iconWidth": 32,
 "horizontalAlign": "left",
 "data": {
  "name": "Button text 9"
 },
 "fontWeight": "normal",
 "cursor": "hand",
 "iconBeforeLabel": true,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 10
},
{
 "pressedBackgroundOpacity": 1,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontColor": "#FFFFFF",
 "id": "Button_1758B215_31FA_0014_41BC_C4EAC2A9544B",
 "pressedBackgroundColor": [
  "#000000"
 ],
 "width": "100%",
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "iconHeight": 32,
 "rollOverBackgroundOpacity": 0.8,
 "shadow": false,
 "verticalAlign": "middle",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadowBlurRadius": 6,
 "minHeight": 1,
 "class": "Button",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "borderColor": "#000000",
 "paddingRight": 0,
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "minWidth": 1,
 "mode": "push",
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "pressedBackgroundColorRatios": [
  0
 ],
 "paddingTop": 0,
 "propagateClick": true,
 "height": 36,
 "label": "Lorem Ipsum",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 5,
 "fontStyle": "italic",
 "textDecoration": "none",
 "iconWidth": 32,
 "horizontalAlign": "left",
 "data": {
  "name": "Button text 10"
 },
 "fontWeight": "normal",
 "cursor": "hand",
 "iconBeforeLabel": true,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 10
},
{
 "rollOverFontFamily": "Oswald",
 "rollOverFontSize": 18,
 "click": "this.setComponentVisibility(this.Container_17EBA2B7_3106_0014_41A9_D6C96D0633AE, false, 0, null, null, false); this.setComponentVisibility(this.Container_0A898462_2D0B_4D94_41B3_BDB53B7688EE, true, 0, null, null, false)",
 "fontColor": "#FFFFFF",
 "id": "Button_17EA82B7_3106_0014_41C2_C9B0D9E6F22C",
 "rollOverBackgroundOpacity": 0.8,
 "pressedBackgroundOpacity": 1,
 "width": "100%",
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "iconHeight": 30,
 "layout": "horizontal",
 "shadow": false,
 "verticalAlign": "middle",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadowBlurRadius": 6,
 "minHeight": 1,
 "class": "Button",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "borderColor": "#000000",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "mode": "push",
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "paddingTop": 0,
 "rollOverIconURL": "skin/Button_17EA82B7_3106_0014_41C2_C9B0D9E6F22C_rollover.png",
 "propagateClick": true,
 "height": 50,
 "label": "BACK",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 5,
 "iconURL": "skin/Button_17EA82B7_3106_0014_41C2_C9B0D9E6F22C.png",
 "fontStyle": "italic",
 "textDecoration": "none",
 "iconWidth": 30,
 "horizontalAlign": "left",
 "data": {
  "name": "Button <BACK"
 },
 "fontWeight": "normal",
 "cursor": "hand",
 "iconBeforeLabel": true,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 5
},
{
 "id": "Container_17EA92B7_3106_0014_41A6_2B88DF32BBA7",
 "scrollBarMargin": 2,
 "layout": "absolute",
 "width": "100%",
 "contentOpaque": false,
 "shadow": false,
 "verticalAlign": "top",
 "minHeight": 1,
 "class": "Container",
 "scrollBarWidth": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundOpacity": 0.5,
 "minWidth": 1,
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "gap": 10,
 "paddingTop": 0,
 "propagateClick": true,
 "paddingRight": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarColor": "#000000",
 "height": 1,
 "data": {
  "name": "line"
 },
 "scrollBarOpacity": 0.5,
 "horizontalAlign": "left",
 "scrollBarVisible": "rollOver",
 "overflow": "scroll",
 "backgroundColorDirection": "vertical",
 "paddingLeft": 0
},
{
 "id": "Container_17EAA2B7_3106_0014_41B0_ACBB1485A79E",
 "scrollBarMargin": 2,
 "layout": "absolute",
 "width": "100%",
 "contentOpaque": false,
 "shadow": false,
 "verticalAlign": "top",
 "minHeight": 1,
 "scrollBarWidth": 10,
 "class": "Container",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "gap": 10,
 "paddingTop": 0,
 "propagateClick": true,
 "height": 8,
 "scrollBarColor": "#000000",
 "data": {
  "name": "line separator"
 },
 "scrollBarOpacity": 0.5,
 "horizontalAlign": "left",
 "scrollBarVisible": "rollOver",
 "overflow": "scroll",
 "paddingLeft": 0
},
{
 "rollOverShadowBlurRadius": 18,
 "pressedBackgroundOpacity": 1,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontColor": "#FFFFFF",
 "id": "Button_17EAB2B7_3106_0014_41A7_209417AD3E9A",
 "rollOverBackgroundOpacity": 0.8,
 "width": "100%",
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "iconHeight": 32,
 "layout": "horizontal",
 "shadow": false,
 "verticalAlign": "middle",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadowBlurRadius": 15,
 "minHeight": 1,
 "rollOverShadow": false,
 "class": "Button",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "borderColor": "#000000",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "mode": "push",
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "paddingTop": 0,
 "propagateClick": true,
 "height": 36,
 "label": "Lorem Ipsum",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 5,
 "fontStyle": "italic",
 "textDecoration": "none",
 "iconWidth": 32,
 "horizontalAlign": "left",
 "data": {
  "name": "Button text 1"
 },
 "fontWeight": "normal",
 "cursor": "hand",
 "iconBeforeLabel": true,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 10
},
{
 "pressedBackgroundOpacity": 1,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontColor": "#FFFFFF",
 "id": "Button_17EAD2B7_3106_0014_41C0_0B5453B4841D",
 "rollOverBackgroundOpacity": 0.8,
 "width": "100%",
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "iconHeight": 32,
 "layout": "horizontal",
 "shadow": false,
 "verticalAlign": "middle",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadowBlurRadius": 6,
 "minHeight": 1,
 "class": "Button",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "borderColor": "#000000",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "mode": "push",
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "paddingTop": 0,
 "propagateClick": true,
 "height": 36,
 "label": "Lorem Ipsum",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 23,
 "fontStyle": "italic",
 "textDecoration": "none",
 "iconWidth": 32,
 "horizontalAlign": "left",
 "data": {
  "name": "Button text 2"
 },
 "fontWeight": "normal",
 "cursor": "hand",
 "iconBeforeLabel": true,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 10
},
{
 "pressedLabel": "Lorem Ipsum",
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontColor": "#FFFFFF",
 "id": "Button_17EAE2B7_3106_0014_41C7_DB7FC43AAEE0",
 "rollOverBackgroundOpacity": 0.8,
 "pressedBackgroundOpacity": 1,
 "width": "100%",
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "iconHeight": 32,
 "layout": "horizontal",
 "shadow": false,
 "verticalAlign": "middle",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadowBlurRadius": 6,
 "minHeight": 1,
 "class": "Button",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "borderColor": "#000000",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "mode": "push",
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "paddingTop": 0,
 "propagateClick": true,
 "height": 36,
 "label": "Lorem Ipsum",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 5,
 "fontStyle": "italic",
 "textDecoration": "none",
 "iconWidth": 32,
 "horizontalAlign": "left",
 "data": {
  "name": "Button text 3"
 },
 "fontWeight": "normal",
 "cursor": "hand",
 "iconBeforeLabel": true,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 10
},
{
 "pressedBackgroundOpacity": 1,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontColor": "#FFFFFF",
 "id": "Button_17EB02B7_3106_0014_41AF_05D9AC36B189",
 "rollOverBackgroundOpacity": 0.8,
 "width": "100%",
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "iconHeight": 32,
 "layout": "horizontal",
 "shadow": false,
 "verticalAlign": "middle",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadowBlurRadius": 6,
 "minHeight": 1,
 "class": "Button",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "borderColor": "#000000",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "mode": "push",
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "paddingTop": 0,
 "propagateClick": true,
 "height": 36,
 "label": "Lorem Ipsum",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 5,
 "fontStyle": "italic",
 "textDecoration": "none",
 "iconWidth": 32,
 "horizontalAlign": "left",
 "data": {
  "name": "Button text 4"
 },
 "fontWeight": "normal",
 "cursor": "hand",
 "iconBeforeLabel": true,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 10
},
{
 "pressedBackgroundOpacity": 1,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontColor": "#FFFFFF",
 "id": "Button_17EB32B7_3106_0014_41C8_467BF6AECBE8",
 "rollOverBackgroundOpacity": 0.8,
 "width": "100%",
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "iconHeight": 32,
 "layout": "horizontal",
 "shadow": false,
 "verticalAlign": "middle",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadowBlurRadius": 6,
 "minHeight": 1,
 "class": "Button",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "borderColor": "#000000",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "mode": "push",
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "paddingTop": 0,
 "propagateClick": true,
 "height": 36,
 "label": "Lorem Ipsum",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 5,
 "fontStyle": "italic",
 "textDecoration": "none",
 "iconWidth": 32,
 "horizontalAlign": "left",
 "data": {
  "name": "Button text 5"
 },
 "fontWeight": "normal",
 "cursor": "hand",
 "iconBeforeLabel": true,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 10
},
{
 "pressedBackgroundOpacity": 1,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontColor": "#FFFFFF",
 "id": "Button_17EB42B7_3106_0014_41B0_CE70CBDDF438",
 "rollOverBackgroundOpacity": 0.8,
 "width": "100%",
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "iconHeight": 32,
 "layout": "horizontal",
 "shadow": false,
 "verticalAlign": "middle",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadowBlurRadius": 6,
 "minHeight": 1,
 "class": "Button",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "borderColor": "#000000",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "mode": "push",
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "paddingTop": 0,
 "propagateClick": true,
 "height": 36,
 "label": "Lorem ipsum",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 5,
 "fontStyle": "italic",
 "textDecoration": "none",
 "iconWidth": 32,
 "horizontalAlign": "left",
 "data": {
  "name": "Button text 6"
 },
 "fontWeight": "normal",
 "cursor": "hand",
 "iconBeforeLabel": true,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 10
},
{
 "pressedBackgroundOpacity": 1,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontColor": "#FFFFFF",
 "id": "Button_17EB52B7_3106_0014_419C_439E593AEC43",
 "rollOverBackgroundOpacity": 0.8,
 "width": "100%",
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "iconHeight": 32,
 "layout": "horizontal",
 "shadow": false,
 "verticalAlign": "middle",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadowBlurRadius": 6,
 "minHeight": 1,
 "class": "Button",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "borderColor": "#000000",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "mode": "push",
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "paddingTop": 0,
 "propagateClick": true,
 "height": 36,
 "label": "Lorem Ipsum",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 5,
 "fontStyle": "italic",
 "textDecoration": "none",
 "iconWidth": 32,
 "horizontalAlign": "left",
 "data": {
  "name": "Button text 7"
 },
 "fontWeight": "normal",
 "cursor": "hand",
 "iconBeforeLabel": true,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 10
},
{
 "pressedBackgroundOpacity": 1,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontColor": "#FFFFFF",
 "id": "Button_17EB62B7_3106_0014_41C5_43B38271B353",
 "rollOverBackgroundOpacity": 0.8,
 "width": "100%",
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "iconHeight": 32,
 "layout": "horizontal",
 "shadow": false,
 "verticalAlign": "middle",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadowBlurRadius": 6,
 "minHeight": 1,
 "class": "Button",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "borderColor": "#000000",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "mode": "push",
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "paddingTop": 0,
 "propagateClick": true,
 "height": 36,
 "label": "Lorem Ipsum",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 5,
 "fontStyle": "italic",
 "textDecoration": "none",
 "iconWidth": 32,
 "horizontalAlign": "left",
 "data": {
  "name": "Button text 8"
 },
 "fontWeight": "normal",
 "cursor": "hand",
 "iconBeforeLabel": true,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 10
},
{
 "pressedBackgroundOpacity": 1,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontColor": "#FFFFFF",
 "id": "Button_17EB72B7_3106_0014_41B9_61857077BF4A",
 "rollOverBackgroundOpacity": 0.8,
 "width": "100%",
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "iconHeight": 32,
 "layout": "horizontal",
 "shadow": false,
 "verticalAlign": "middle",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadowBlurRadius": 6,
 "minHeight": 1,
 "class": "Button",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "borderColor": "#000000",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "mode": "push",
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "paddingTop": 0,
 "propagateClick": true,
 "height": 36,
 "label": "Lorem Ipsum",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 5,
 "fontStyle": "italic",
 "textDecoration": "none",
 "iconWidth": 32,
 "horizontalAlign": "left",
 "data": {
  "name": "Button text 9"
 },
 "fontWeight": "normal",
 "cursor": "hand",
 "iconBeforeLabel": true,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 10
},
{
 "pressedBackgroundOpacity": 1,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontColor": "#FFFFFF",
 "id": "Button_17EB92B7_3106_0014_41B2_34A3E3F63779",
 "pressedBackgroundColor": [
  "#000000"
 ],
 "width": "100%",
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "iconHeight": 32,
 "rollOverBackgroundOpacity": 0.8,
 "shadow": false,
 "verticalAlign": "middle",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadowBlurRadius": 6,
 "minHeight": 1,
 "class": "Button",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "borderColor": "#000000",
 "paddingRight": 0,
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "minWidth": 1,
 "mode": "push",
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "pressedBackgroundColorRatios": [
  0
 ],
 "paddingTop": 0,
 "propagateClick": true,
 "height": 36,
 "label": "Lorem Ipsum",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 5,
 "fontStyle": "italic",
 "textDecoration": "none",
 "iconWidth": 32,
 "horizontalAlign": "left",
 "data": {
  "name": "Button text 10"
 },
 "fontWeight": "normal",
 "cursor": "hand",
 "iconBeforeLabel": true,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 10
},
{
 "rollOverFontFamily": "Oswald",
 "rollOverFontSize": 18,
 "click": "this.setComponentVisibility(this.Container_168D8311_3106_01EC_41B0_F2D40886AB88, false, 0, null, null, false); this.setComponentVisibility(this.Container_0A898462_2D0B_4D94_41B3_BDB53B7688EE, true, 0, null, null, false)",
 "fontColor": "#FFFFFF",
 "id": "Button_168CA310_3106_01EC_41C7_72CE0522951A",
 "rollOverBackgroundOpacity": 0.8,
 "pressedBackgroundOpacity": 1,
 "width": "100%",
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "iconHeight": 30,
 "layout": "horizontal",
 "shadow": false,
 "verticalAlign": "middle",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadowBlurRadius": 6,
 "minHeight": 1,
 "class": "Button",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "borderColor": "#000000",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "mode": "push",
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "paddingTop": 0,
 "rollOverIconURL": "skin/Button_168CA310_3106_01EC_41C7_72CE0522951A_rollover.png",
 "propagateClick": true,
 "height": 50,
 "label": "BACK",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 5,
 "iconURL": "skin/Button_168CA310_3106_01EC_41C7_72CE0522951A.png",
 "fontStyle": "italic",
 "textDecoration": "none",
 "iconWidth": 30,
 "horizontalAlign": "left",
 "data": {
  "name": "Button <BACK"
 },
 "fontWeight": "normal",
 "cursor": "hand",
 "iconBeforeLabel": true,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 5
},
{
 "id": "Container_168C8310_3106_01EC_4187_B16F315A4A23",
 "scrollBarMargin": 2,
 "layout": "absolute",
 "width": "100%",
 "contentOpaque": false,
 "shadow": false,
 "verticalAlign": "top",
 "minHeight": 1,
 "class": "Container",
 "scrollBarWidth": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundOpacity": 0.5,
 "minWidth": 1,
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "gap": 10,
 "paddingTop": 0,
 "propagateClick": true,
 "paddingRight": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarColor": "#000000",
 "height": 1,
 "data": {
  "name": "line"
 },
 "scrollBarOpacity": 0.5,
 "horizontalAlign": "left",
 "scrollBarVisible": "rollOver",
 "overflow": "scroll",
 "backgroundColorDirection": "vertical",
 "paddingLeft": 0
},
{
 "id": "Container_168D7310_3106_01EC_41BE_5FCBD9E27BE4",
 "scrollBarMargin": 2,
 "layout": "absolute",
 "width": "100%",
 "contentOpaque": false,
 "shadow": false,
 "verticalAlign": "top",
 "minHeight": 1,
 "scrollBarWidth": 10,
 "class": "Container",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "gap": 10,
 "paddingTop": 0,
 "propagateClick": true,
 "height": 8,
 "scrollBarColor": "#000000",
 "data": {
  "name": "line separator"
 },
 "scrollBarOpacity": 0.5,
 "horizontalAlign": "left",
 "scrollBarVisible": "rollOver",
 "overflow": "scroll",
 "paddingLeft": 0
},
{
 "rollOverShadowBlurRadius": 18,
 "pressedBackgroundOpacity": 1,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontColor": "#FFFFFF",
 "id": "Button_168D6310_3106_01EC_41B8_A0B6BE627547",
 "rollOverBackgroundOpacity": 0.8,
 "width": "100%",
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "iconHeight": 32,
 "layout": "horizontal",
 "shadow": false,
 "verticalAlign": "middle",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadowBlurRadius": 15,
 "minHeight": 1,
 "rollOverShadow": false,
 "class": "Button",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "borderColor": "#000000",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "mode": "push",
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "paddingTop": 0,
 "propagateClick": true,
 "height": 36,
 "label": "Lorem Ipsum",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 5,
 "fontStyle": "italic",
 "textDecoration": "none",
 "iconWidth": 32,
 "horizontalAlign": "left",
 "data": {
  "name": "Button text 1"
 },
 "fontWeight": "normal",
 "cursor": "hand",
 "iconBeforeLabel": true,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 10
},
{
 "pressedBackgroundOpacity": 1,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontColor": "#FFFFFF",
 "id": "Button_168D5310_3106_01EC_41B5_96D9387401B8",
 "rollOverBackgroundOpacity": 0.8,
 "width": "100%",
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "iconHeight": 32,
 "layout": "horizontal",
 "shadow": false,
 "verticalAlign": "middle",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadowBlurRadius": 6,
 "minHeight": 1,
 "class": "Button",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "borderColor": "#000000",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "mode": "push",
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "paddingTop": 0,
 "propagateClick": true,
 "height": 36,
 "label": "Lorem Ipsum",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 23,
 "fontStyle": "italic",
 "textDecoration": "none",
 "iconWidth": 32,
 "horizontalAlign": "left",
 "data": {
  "name": "Button text 2"
 },
 "fontWeight": "normal",
 "cursor": "hand",
 "iconBeforeLabel": true,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 10
},
{
 "pressedLabel": "Lorem Ipsum",
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontColor": "#FFFFFF",
 "id": "Button_168D3310_3106_01EC_41AC_5D524E4677A5",
 "rollOverBackgroundOpacity": 0.8,
 "pressedBackgroundOpacity": 1,
 "width": "100%",
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "iconHeight": 32,
 "layout": "horizontal",
 "shadow": false,
 "verticalAlign": "middle",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadowBlurRadius": 6,
 "minHeight": 1,
 "class": "Button",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "borderColor": "#000000",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "mode": "push",
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "paddingTop": 0,
 "propagateClick": true,
 "height": 36,
 "label": "Lorem Ipsum",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 5,
 "fontStyle": "italic",
 "textDecoration": "none",
 "iconWidth": 32,
 "horizontalAlign": "left",
 "data": {
  "name": "Button text 3"
 },
 "fontWeight": "normal",
 "cursor": "hand",
 "iconBeforeLabel": true,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 10
},
{
 "pressedBackgroundOpacity": 1,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontColor": "#FFFFFF",
 "id": "Button_168D2310_3106_01EC_41B8_9D7D1B2B55FA",
 "rollOverBackgroundOpacity": 0.8,
 "width": "100%",
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "iconHeight": 32,
 "layout": "horizontal",
 "shadow": false,
 "verticalAlign": "middle",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadowBlurRadius": 6,
 "minHeight": 1,
 "class": "Button",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "borderColor": "#000000",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "mode": "push",
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "paddingTop": 0,
 "propagateClick": true,
 "height": 36,
 "label": "Lorem Ipsum",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 5,
 "fontStyle": "italic",
 "textDecoration": "none",
 "iconWidth": 32,
 "horizontalAlign": "left",
 "data": {
  "name": "Button text 4"
 },
 "fontWeight": "normal",
 "cursor": "hand",
 "iconBeforeLabel": true,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 10
},
{
 "pressedBackgroundOpacity": 1,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontColor": "#FFFFFF",
 "id": "Button_168D0310_3106_01EC_41A1_FA8FC42E6FF3",
 "rollOverBackgroundOpacity": 0.8,
 "width": "100%",
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "iconHeight": 32,
 "layout": "horizontal",
 "shadow": false,
 "verticalAlign": "middle",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadowBlurRadius": 6,
 "minHeight": 1,
 "class": "Button",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "borderColor": "#000000",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "mode": "push",
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "paddingTop": 0,
 "propagateClick": true,
 "height": 36,
 "label": "Lorem Ipsum",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 5,
 "fontStyle": "italic",
 "textDecoration": "none",
 "iconWidth": 32,
 "horizontalAlign": "left",
 "data": {
  "name": "Button text 5"
 },
 "fontWeight": "normal",
 "cursor": "hand",
 "iconBeforeLabel": true,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 10
},
{
 "pressedBackgroundOpacity": 1,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontColor": "#FFFFFF",
 "id": "Button_168DE310_3106_01EC_4192_6A9F468A0ADE",
 "rollOverBackgroundOpacity": 0.8,
 "width": "100%",
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "iconHeight": 32,
 "layout": "horizontal",
 "shadow": false,
 "verticalAlign": "middle",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadowBlurRadius": 6,
 "minHeight": 1,
 "class": "Button",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "borderColor": "#000000",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "mode": "push",
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "paddingTop": 0,
 "propagateClick": true,
 "height": 36,
 "label": "Lorem ipsum",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 5,
 "fontStyle": "italic",
 "textDecoration": "none",
 "iconWidth": 32,
 "horizontalAlign": "left",
 "data": {
  "name": "Button text 6"
 },
 "fontWeight": "normal",
 "cursor": "hand",
 "iconBeforeLabel": true,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 10
},
{
 "pressedBackgroundOpacity": 1,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontColor": "#FFFFFF",
 "id": "Button_168DD310_3106_01EC_4190_7815FA70349E",
 "rollOverBackgroundOpacity": 0.8,
 "width": "100%",
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "iconHeight": 32,
 "layout": "horizontal",
 "shadow": false,
 "verticalAlign": "middle",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadowBlurRadius": 6,
 "minHeight": 1,
 "class": "Button",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "borderColor": "#000000",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "mode": "push",
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "paddingTop": 0,
 "propagateClick": true,
 "height": 36,
 "label": "Lorem Ipsum",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 5,
 "fontStyle": "italic",
 "textDecoration": "none",
 "iconWidth": 32,
 "horizontalAlign": "left",
 "data": {
  "name": "Button text 7"
 },
 "fontWeight": "normal",
 "cursor": "hand",
 "iconBeforeLabel": true,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 10
},
{
 "pressedBackgroundOpacity": 1,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontColor": "#FFFFFF",
 "id": "Button_168DB310_3106_01EC_41B2_3511AA5E40E1",
 "rollOverBackgroundOpacity": 0.8,
 "width": "100%",
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "iconHeight": 32,
 "layout": "horizontal",
 "shadow": false,
 "verticalAlign": "middle",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadowBlurRadius": 6,
 "minHeight": 1,
 "class": "Button",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "borderColor": "#000000",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "mode": "push",
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "paddingTop": 0,
 "propagateClick": true,
 "height": 36,
 "label": "Lorem Ipsum",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 5,
 "fontStyle": "italic",
 "textDecoration": "none",
 "iconWidth": 32,
 "horizontalAlign": "left",
 "data": {
  "name": "Button text 8"
 },
 "fontWeight": "normal",
 "cursor": "hand",
 "iconBeforeLabel": true,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 10
},
{
 "pressedBackgroundOpacity": 1,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontColor": "#FFFFFF",
 "id": "Button_168DA310_3106_01EC_41BE_DF88732C2A28",
 "rollOverBackgroundOpacity": 0.8,
 "width": "100%",
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "iconHeight": 32,
 "layout": "horizontal",
 "shadow": false,
 "verticalAlign": "middle",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadowBlurRadius": 6,
 "minHeight": 1,
 "class": "Button",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "borderColor": "#000000",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "mode": "push",
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "paddingTop": 0,
 "propagateClick": true,
 "height": 36,
 "label": "Lorem Ipsum",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 5,
 "fontStyle": "italic",
 "textDecoration": "none",
 "iconWidth": 32,
 "horizontalAlign": "left",
 "data": {
  "name": "Button text 9"
 },
 "fontWeight": "normal",
 "cursor": "hand",
 "iconBeforeLabel": true,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 10
},
{
 "pressedBackgroundOpacity": 1,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontColor": "#FFFFFF",
 "id": "Button_168D9311_3106_01EC_41A8_3BD8769525D6",
 "pressedBackgroundColor": [
  "#000000"
 ],
 "width": "100%",
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "iconHeight": 32,
 "rollOverBackgroundOpacity": 0.8,
 "shadow": false,
 "verticalAlign": "middle",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadowBlurRadius": 6,
 "minHeight": 1,
 "class": "Button",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "borderColor": "#000000",
 "paddingRight": 0,
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "minWidth": 1,
 "mode": "push",
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "pressedBackgroundColorRatios": [
  0
 ],
 "paddingTop": 0,
 "propagateClick": true,
 "height": 36,
 "label": "Lorem Ipsum",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 5,
 "fontStyle": "italic",
 "textDecoration": "none",
 "iconWidth": 32,
 "horizontalAlign": "left",
 "data": {
  "name": "Button text 10"
 },
 "fontWeight": "normal",
 "cursor": "hand",
 "iconBeforeLabel": true,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 10
},
{
 "maxHeight": 200,
 "maxWidth": 200,
 "id": "Image_1E18723C_57F1_802D_41C5_8325536874A5",
 "width": "25%",
 "shadow": false,
 "verticalAlign": "top",
 "url": "skin/Image_1E18723C_57F1_802D_41C5_8325536874A5.jpg",
 "minHeight": 1,
 "class": "Image",
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 0,
 "paddingTop": 0,
 "propagateClick": false,
 "paddingRight": 0,
 "height": "100%",
 "scaleMode": "fit_inside",
 "data": {
  "name": "agent photo"
 },
 "horizontalAlign": "left",
 "paddingLeft": 0
},
{
 "id": "HTMLText_1E18423C_57F1_802D_41C4_458DB7F892AC",
 "scrollBarMargin": 2,
 "width": "75%",
 "shadow": false,
 "minHeight": 1,
 "scrollBarWidth": 10,
 "class": "HTMLText",
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "borderSize": 0,
 "paddingBottom": 10,
 "paddingTop": 0,
 "propagateClick": false,
 "paddingRight": 10,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:2.58vh;font-family:'Oswald';\"><B><I>JOHN DOE</I></B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:2.29vh;font-family:'Oswald';\"><I>Licensed Real Estate Salesperson</I></SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.86vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.86vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#999999;font-size:1.86vh;font-family:'Oswald';\"><I>Tlf.: +11 111 111 111</I></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#999999;font-size:1.86vh;font-family:'Oswald';\"><I>jhondoe@realestate.com</I></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#999999;font-size:1.86vh;font-family:'Oswald';\"><I>www.loremipsum.com</I></SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:0.86vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.86vh;font-family:Arial, Helvetica, sans-serif;\"/></p><p STYLE=\"margin:0; line-height:0.86vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.86vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.86vh;font-family:Arial, Helvetica, sans-serif;\">Mauris aliquet neque quis libero consequat vestibulum. Donec lacinia consequat dolor viverra sagittis. Praesent consequat porttitor risus, eu condimentum nunc. Proin et velit ac sapien luctus efficitur egestas ac augue. Nunc dictum, augue eget eleifend interdum, quam libero imperdiet lectus, vel scelerisque turpis lectus vel ligula. Duis a porta sem. Maecenas sollicitudin nunc id risus fringilla, a pharetra orci iaculis. Aliquam turpis ligula, tincidunt sit amet consequat ac, imperdiet non dolor.</SPAN></DIV></div>",
 "scrollBarColor": "#04A3E1",
 "height": "100%",
 "data": {
  "name": "HTMLText19460"
 },
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "paddingLeft": 10
}],
 "paddingBottom": 0,
 "desktopMipmappingEnabled": false,
 "paddingTop": 0,
 "propagateClick": true,
 "gap": 10,
 "backgroundPreloadEnabled": true,
 "scrollBarColor": "#000000",
 "height": "100%",
 "mouseWheelEnabled": true,
 "vrPolyfillScale": 0.5,
 "mobileMipmappingEnabled": false,
 "data": {
  "name": "Player468"
 },
 "scrollBarOpacity": 0.5,
 "horizontalAlign": "left",
 "scrollBarVisible": "rollOver",
 "overflow": "visible",
 "paddingLeft": 0
};

    
    function HistoryData(playList) {
        this.playList = playList;
        this.list = [];
        this.pointer = -1;
    }

    HistoryData.prototype.add = function(index){
        if(this.pointer < this.list.length && this.list[this.pointer] == index) {
            return;
        }
        ++this.pointer;
        this.list.splice(this.pointer, this.list.length - this.pointer, index);
    };

    HistoryData.prototype.back = function(){
        if(!this.canBack()) return;
        this.playList.set('selectedIndex', this.list[--this.pointer]);
    };

    HistoryData.prototype.forward = function(){
        if(!this.canForward()) return;
        this.playList.set('selectedIndex', this.list[++this.pointer]);
    };

    HistoryData.prototype.canBack = function(){
        return this.pointer > 0;
    };

    HistoryData.prototype.canForward = function(){
        return this.pointer >= 0 && this.pointer < this.list.length-1;
    };
    //

    if(script.data == undefined)
        script.data = {};
    script.data["history"] = {};    //playListID -> HistoryData

    TDV.PlayerAPI.defineScript(script);
})();

(function(){
    var script = {
 "mouseWheelEnabled": true,
 "start": "this.init(); this.syncPlaylists([this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist,this.mainPlayList])",
 "paddingLeft": 0,
 "id": "rootPlayer",
 "mobileMipmappingEnabled": false,
 "vrPolyfillScale": 0.5,
 "scrollBarWidth": 10,
 "desktopMipmappingEnabled": false,
 "minWidth": 20,
 "backgroundPreloadEnabled": true,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "layout": "absolute",
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
 "defaultVRPointer": "laser",
 "scripts": {
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "registerKey": function(key, value){  window[key] = value; },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "unregisterKey": function(key){  delete window[key]; },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "existsKey": function(key){  return key in window; },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "getKey": function(key){  return window[key]; }
 },
 "verticalAlign": "top",
 "width": "100%",
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "shadow": false,
 "height": "100%",
 "downloadEnabled": false,
 "gap": 10,
 "class": "Player",
 "paddingBottom": 0,
 "paddingTop": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "overflow": "visible",
 "minHeight": 20,
 "definitions": [{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BA638A41_B1E7_546E_41E5_CB9EB108BF1B"
  }
 ],
 "hfovMin": "135%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_BA639DE7_B1E7_4C32_41E3_9470B15291AB",
 "thumbnailUrl": "media/panorama_BA639DE7_B1E7_4C32_41E3_9470B15291AB_t.jpg",
 "label": "Star 1 05",
 "pitch": 0,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA639DE7_B1E7_4C32_41E3_9470B15291AB_0/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BA639DE7_B1E7_4C32_41E3_9470B15291AB_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BA639DE7_B1E7_4C32_41E3_9470B15291AB_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BA639DE7_B1E7_4C32_41E3_9470B15291AB_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA639DE7_B1E7_4C32_41E3_9470B15291AB_0/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BA639DE7_B1E7_4C32_41E3_9470B15291AB_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BA639DE7_B1E7_4C32_41E3_9470B15291AB_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BA639DE7_B1E7_4C32_41E3_9470B15291AB_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA639DE7_B1E7_4C32_41E3_9470B15291AB_0/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BA639DE7_B1E7_4C32_41E3_9470B15291AB_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BA639DE7_B1E7_4C32_41E3_9470B15291AB_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BA639DE7_B1E7_4C32_41E3_9470B15291AB_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA639DE7_B1E7_4C32_41E3_9470B15291AB_0/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BA639DE7_B1E7_4C32_41E3_9470B15291AB_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BA639DE7_B1E7_4C32_41E3_9470B15291AB_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BA639DE7_B1E7_4C32_41E3_9470B15291AB_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA639DE7_B1E7_4C32_41E3_9470B15291AB_0/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BA639DE7_B1E7_4C32_41E3_9470B15291AB_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BA639DE7_B1E7_4C32_41E3_9470B15291AB_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BA639DE7_B1E7_4C32_41E3_9470B15291AB_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA639DE7_B1E7_4C32_41E3_9470B15291AB_0/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BA639DE7_B1E7_4C32_41E3_9470B15291AB_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BA639DE7_B1E7_4C32_41E3_9470B15291AB_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BA639DE7_B1E7_4C32_41E3_9470B15291AB_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_BA639DE7_B1E7_4C32_41E3_9470B15291AB_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_A1DF9798_B1FD_5C1F_41D4_A9F8F4A52B55"
 ]
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_BA6A822A_B1E4_D432_41B8_C0BE3F62BF39_camera",
 "class": "PanoramaCamera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BA6A822A_B1E4_D432_41B8_C0BE3F62BF39"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BA638A41_B1E7_546E_41E5_CB9EB108BF1B"
  }
 ],
 "hfovMin": "135%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_BA68968B_B1E4_BCF1_41D6_4205B56EF235",
 "thumbnailUrl": "media/panorama_BA68968B_B1E4_BCF1_41D6_4205B56EF235_t.jpg",
 "label": "Star 1 03",
 "pitch": 0,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA68968B_B1E4_BCF1_41D6_4205B56EF235_0/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BA68968B_B1E4_BCF1_41D6_4205B56EF235_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BA68968B_B1E4_BCF1_41D6_4205B56EF235_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BA68968B_B1E4_BCF1_41D6_4205B56EF235_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA68968B_B1E4_BCF1_41D6_4205B56EF235_0/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BA68968B_B1E4_BCF1_41D6_4205B56EF235_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BA68968B_B1E4_BCF1_41D6_4205B56EF235_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BA68968B_B1E4_BCF1_41D6_4205B56EF235_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA68968B_B1E4_BCF1_41D6_4205B56EF235_0/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BA68968B_B1E4_BCF1_41D6_4205B56EF235_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BA68968B_B1E4_BCF1_41D6_4205B56EF235_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BA68968B_B1E4_BCF1_41D6_4205B56EF235_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA68968B_B1E4_BCF1_41D6_4205B56EF235_0/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BA68968B_B1E4_BCF1_41D6_4205B56EF235_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BA68968B_B1E4_BCF1_41D6_4205B56EF235_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BA68968B_B1E4_BCF1_41D6_4205B56EF235_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA68968B_B1E4_BCF1_41D6_4205B56EF235_0/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BA68968B_B1E4_BCF1_41D6_4205B56EF235_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BA68968B_B1E4_BCF1_41D6_4205B56EF235_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BA68968B_B1E4_BCF1_41D6_4205B56EF235_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA68968B_B1E4_BCF1_41D6_4205B56EF235_0/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BA68968B_B1E4_BCF1_41D6_4205B56EF235_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BA68968B_B1E4_BCF1_41D6_4205B56EF235_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BA68968B_B1E4_BCF1_41D6_4205B56EF235_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_BA68968B_B1E4_BCF1_41D6_4205B56EF235_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_BE874317_B1E5_5412_41D9_46CE1374FBAF",
  "this.overlay_BE4EDA18_B1E5_741E_41CB_DBA8BAC0D8D6"
 ]
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_BA639DE7_B1E7_4C32_41E3_9470B15291AB_camera",
 "class": "PanoramaCamera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BA639DE7_B1E7_4C32_41E3_9470B15291AB"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BA68968B_B1E4_BCF1_41D6_4205B56EF235"
  }
 ],
 "hfovMin": "135%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_BA638A41_B1E7_546E_41E5_CB9EB108BF1B",
 "thumbnailUrl": "media/panorama_BA638A41_B1E7_546E_41E5_CB9EB108BF1B_t.jpg",
 "label": "Star 1 04",
 "pitch": 0,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA638A41_B1E7_546E_41E5_CB9EB108BF1B_0/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BA638A41_B1E7_546E_41E5_CB9EB108BF1B_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BA638A41_B1E7_546E_41E5_CB9EB108BF1B_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BA638A41_B1E7_546E_41E5_CB9EB108BF1B_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA638A41_B1E7_546E_41E5_CB9EB108BF1B_0/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BA638A41_B1E7_546E_41E5_CB9EB108BF1B_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BA638A41_B1E7_546E_41E5_CB9EB108BF1B_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BA638A41_B1E7_546E_41E5_CB9EB108BF1B_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA638A41_B1E7_546E_41E5_CB9EB108BF1B_0/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BA638A41_B1E7_546E_41E5_CB9EB108BF1B_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BA638A41_B1E7_546E_41E5_CB9EB108BF1B_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BA638A41_B1E7_546E_41E5_CB9EB108BF1B_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA638A41_B1E7_546E_41E5_CB9EB108BF1B_0/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BA638A41_B1E7_546E_41E5_CB9EB108BF1B_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BA638A41_B1E7_546E_41E5_CB9EB108BF1B_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BA638A41_B1E7_546E_41E5_CB9EB108BF1B_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA638A41_B1E7_546E_41E5_CB9EB108BF1B_0/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BA638A41_B1E7_546E_41E5_CB9EB108BF1B_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BA638A41_B1E7_546E_41E5_CB9EB108BF1B_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BA638A41_B1E7_546E_41E5_CB9EB108BF1B_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA638A41_B1E7_546E_41E5_CB9EB108BF1B_0/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BA638A41_B1E7_546E_41E5_CB9EB108BF1B_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BA638A41_B1E7_546E_41E5_CB9EB108BF1B_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BA638A41_B1E7_546E_41E5_CB9EB108BF1B_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_BA638A41_B1E7_546E_41E5_CB9EB108BF1B_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_BE33D3C4_B1E4_B476_41DC_87EE19B845AC",
  "this.overlay_A06B5937_B1E5_5412_41E1_E9B505A5B682"
 ]
},
{
 "items": [
  {
   "media": "this.panorama_BA989CFD_B1E4_CC11_41C3_CBEF05F9A169",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 0, 1)",
   "camera": "this.panorama_BA989CFD_B1E4_CC11_41C3_CBEF05F9A169_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BA6A822A_B1E4_D432_41B8_C0BE3F62BF39",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 1, 2)",
   "camera": "this.panorama_BA6A822A_B1E4_D432_41B8_C0BE3F62BF39_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BA68968B_B1E4_BCF1_41D6_4205B56EF235",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 2, 3)",
   "camera": "this.panorama_BA68968B_B1E4_BCF1_41D6_4205B56EF235_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BA638A41_B1E7_546E_41E5_CB9EB108BF1B",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 3, 4)",
   "camera": "this.panorama_BA638A41_B1E7_546E_41E5_CB9EB108BF1B_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BA639DE7_B1E7_4C32_41E3_9470B15291AB",
   "player": "this.MainViewerPanoramaPlayer",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 4, 0)",
   "camera": "this.panorama_BA639DE7_B1E7_4C32_41E3_9470B15291AB_camera",
   "end": "this.trigger('tourEnded')",
   "class": "PanoramaPlayListItem"
  }
 ],
 "id": "mainPlayList",
 "class": "PlayList"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_BA638A41_B1E7_546E_41E5_CB9EB108BF1B_camera",
 "class": "PanoramaCamera"
},
{
 "displayOriginPosition": {
  "hfov": 165,
  "stereographicFactor": 1,
  "yaw": 0,
  "class": "RotationalCameraDisplayPosition",
  "pitch": -90
 },
 "automaticZoomSpeed": 10,
 "displayMovements": [
  {
   "easing": "linear",
   "class": "TargetRotationalCameraDisplayMovement",
   "duration": 1000
  },
  {
   "targetPitch": 0,
   "easing": "cubic_in_out",
   "class": "TargetRotationalCameraDisplayMovement",
   "duration": 3000,
   "targetStereographicFactor": 0
  }
 ],
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_BA989CFD_B1E4_CC11_41C3_CBEF05F9A169_camera",
 "class": "PanoramaCamera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BA989CFD_B1E4_CC11_41C3_CBEF05F9A169"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BA68968B_B1E4_BCF1_41D6_4205B56EF235"
  }
 ],
 "hfovMin": "135%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_BA6A822A_B1E4_D432_41B8_C0BE3F62BF39",
 "thumbnailUrl": "media/panorama_BA6A822A_B1E4_D432_41B8_C0BE3F62BF39_t.jpg",
 "label": "Star 1 02",
 "pitch": 0,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA6A822A_B1E4_D432_41B8_C0BE3F62BF39_0/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BA6A822A_B1E4_D432_41B8_C0BE3F62BF39_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BA6A822A_B1E4_D432_41B8_C0BE3F62BF39_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BA6A822A_B1E4_D432_41B8_C0BE3F62BF39_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA6A822A_B1E4_D432_41B8_C0BE3F62BF39_0/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BA6A822A_B1E4_D432_41B8_C0BE3F62BF39_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BA6A822A_B1E4_D432_41B8_C0BE3F62BF39_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BA6A822A_B1E4_D432_41B8_C0BE3F62BF39_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA6A822A_B1E4_D432_41B8_C0BE3F62BF39_0/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BA6A822A_B1E4_D432_41B8_C0BE3F62BF39_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BA6A822A_B1E4_D432_41B8_C0BE3F62BF39_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BA6A822A_B1E4_D432_41B8_C0BE3F62BF39_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA6A822A_B1E4_D432_41B8_C0BE3F62BF39_0/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BA6A822A_B1E4_D432_41B8_C0BE3F62BF39_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BA6A822A_B1E4_D432_41B8_C0BE3F62BF39_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BA6A822A_B1E4_D432_41B8_C0BE3F62BF39_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA6A822A_B1E4_D432_41B8_C0BE3F62BF39_0/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BA6A822A_B1E4_D432_41B8_C0BE3F62BF39_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BA6A822A_B1E4_D432_41B8_C0BE3F62BF39_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BA6A822A_B1E4_D432_41B8_C0BE3F62BF39_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA6A822A_B1E4_D432_41B8_C0BE3F62BF39_0/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BA6A822A_B1E4_D432_41B8_C0BE3F62BF39_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BA6A822A_B1E4_D432_41B8_C0BE3F62BF39_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BA6A822A_B1E4_D432_41B8_C0BE3F62BF39_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_BA6A822A_B1E4_D432_41B8_C0BE3F62BF39_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_BF0143AC_B1EC_B436_41E0_9960DEDA7B90",
  "this.overlay_BEF9B965_B1EC_D431_41B7_A60ADF7E1AE2"
 ]
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -180,
  "class": "PanoramaCameraPosition",
  "pitch": -17.63
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_F62592D7_E67D_4633_41A7_414A5DEDBC32",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -180,
  "class": "PanoramaCameraPosition",
  "pitch": -27.92
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_F6131373_E67D_46F2_41B1_B0CFE8E13C2D",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -180,
  "class": "PanoramaCameraPosition",
  "pitch": -11.02
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_F603E33D_E67D_4676_41E4_FEE0729F7ED5",
 "class": "PanoramaCamera"
},
{
 "items": [
  {
   "media": "this.panorama_BA989CFD_B1E4_CC11_41C3_CBEF05F9A169",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 0, 1)",
   "camera": "this.panorama_BA989CFD_B1E4_CC11_41C3_CBEF05F9A169_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BA6A822A_B1E4_D432_41B8_C0BE3F62BF39",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 1, 2)",
   "camera": "this.panorama_BA6A822A_B1E4_D432_41B8_C0BE3F62BF39_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BA68968B_B1E4_BCF1_41D6_4205B56EF235",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 2, 3)",
   "camera": "this.panorama_BA68968B_B1E4_BCF1_41D6_4205B56EF235_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BA638A41_B1E7_546E_41E5_CB9EB108BF1B",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 3, 4)",
   "camera": "this.panorama_BA638A41_B1E7_546E_41E5_CB9EB108BF1B_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BA639DE7_B1E7_4C32_41E3_9470B15291AB",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 4, 0)",
   "camera": "this.panorama_BA639DE7_B1E7_4C32_41E3_9470B15291AB_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  }
 ],
 "id": "ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist",
 "class": "PlayList"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BA6A822A_B1E4_D432_41B8_C0BE3F62BF39"
  }
 ],
 "hfovMin": "135%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_BA989CFD_B1E4_CC11_41C3_CBEF05F9A169",
 "thumbnailUrl": "media/panorama_BA989CFD_B1E4_CC11_41C3_CBEF05F9A169_t.jpg",
 "label": "Star 1 01",
 "pitch": 0,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA989CFD_B1E4_CC11_41C3_CBEF05F9A169_0/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BA989CFD_B1E4_CC11_41C3_CBEF05F9A169_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BA989CFD_B1E4_CC11_41C3_CBEF05F9A169_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BA989CFD_B1E4_CC11_41C3_CBEF05F9A169_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA989CFD_B1E4_CC11_41C3_CBEF05F9A169_0/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BA989CFD_B1E4_CC11_41C3_CBEF05F9A169_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BA989CFD_B1E4_CC11_41C3_CBEF05F9A169_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BA989CFD_B1E4_CC11_41C3_CBEF05F9A169_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA989CFD_B1E4_CC11_41C3_CBEF05F9A169_0/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BA989CFD_B1E4_CC11_41C3_CBEF05F9A169_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BA989CFD_B1E4_CC11_41C3_CBEF05F9A169_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BA989CFD_B1E4_CC11_41C3_CBEF05F9A169_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA989CFD_B1E4_CC11_41C3_CBEF05F9A169_0/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BA989CFD_B1E4_CC11_41C3_CBEF05F9A169_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BA989CFD_B1E4_CC11_41C3_CBEF05F9A169_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BA989CFD_B1E4_CC11_41C3_CBEF05F9A169_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA989CFD_B1E4_CC11_41C3_CBEF05F9A169_0/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BA989CFD_B1E4_CC11_41C3_CBEF05F9A169_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BA989CFD_B1E4_CC11_41C3_CBEF05F9A169_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BA989CFD_B1E4_CC11_41C3_CBEF05F9A169_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA989CFD_B1E4_CC11_41C3_CBEF05F9A169_0/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BA989CFD_B1E4_CC11_41C3_CBEF05F9A169_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BA989CFD_B1E4_CC11_41C3_CBEF05F9A169_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BA989CFD_B1E4_CC11_41C3_CBEF05F9A169_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_BA989CFD_B1E4_CC11_41C3_CBEF05F9A169_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_BFC63FAB_B1EC_CC32_41C4_180DB8648D76"
 ]
},
{
 "viewerArea": "this.MainViewer",
 "displayPlaybackBar": true,
 "gyroscopeVerticalDraggingEnabled": true,
 "touchControlMode": "drag_rotation",
 "id": "MainViewerPanoramaPlayer",
 "class": "PanoramaPlayer",
 "mouseControlMode": "drag_rotation"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -180,
  "class": "PanoramaCameraPosition",
  "pitch": -11.76
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_F631830D_E67D_4617_41B1_5C9F1A35532C",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_BA68968B_B1E4_BCF1_41D6_4205B56EF235_camera",
 "class": "PanoramaCamera"
},
{
 "minHeight": 50,
 "progressBarBorderColor": "#0066FF",
 "progressBackgroundColorDirection": "vertical",
 "id": "MainViewer",
 "left": 0,
 "playbackBarBottom": 5,
 "toolTipShadowSpread": 0,
 "playbackBarHeadOpacity": 1,
 "data": {
  "name": "Main Viewer"
 },
 "progressBorderColor": "#FFFFFF",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "toolTipBorderColor": "#767676",
 "minWidth": 100,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "right": "0.21%",
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipOpacity": 0.5,
 "toolTipFontSize": 13,
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "toolTipShadowBlurRadius": 3,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "paddingRight": 0,
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 7,
 "playbackBarRight": 0,
 "toolTipFontWeight": "normal",
 "shadow": false,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 0,
 "playbackBarProgressBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "class": "ViewerArea",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionMode": "blending",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "playbackBarHeadShadowHorizontalLength": 0,
 "toolTipShadowOpacity": 0,
 "progressLeft": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarBorderSize": 0,
 "propagateClick": true,
 "playbackBarBackgroundOpacity": 1,
 "toolTipFontFamily": "Georgia",
 "vrPointerSelectionColor": "#FF6600",
 "toolTipTextShadowOpacity": 0,
 "paddingLeft": 0,
 "playbackBarHeadShadowColor": "#000000",
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "borderSize": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 0,
 "toolTipBackgroundColor": "#000000",
 "toolTipFontColor": "#FFFFFF",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "top": 0,
 "playbackBarOpacity": 1,
 "playbackBarHeadShadowVerticalLength": 0,
 "bottom": "0.24%",
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "vrPointerColor": "#FFFFFF",
 "displayTooltipInTouchScreens": true,
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "toolTipPaddingTop": 7,
 "toolTipPaddingLeft": 10,
 "progressBorderRadius": 0,
 "toolTipPaddingRight": 10,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarLeft": 0,
 "paddingBottom": 0,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "paddingTop": 0,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "transitionDuration": 500,
 "playbackBarHeadHeight": 15
},
{
 "propagateClick": true,
 "paddingLeft": 0,
 "id": "Container_EF8F8BD8_E386_8E03_41E3_4CF7CC1F4D8E",
 "scrollBarColor": "#000000",
 "scrollBarWidth": 10,
 "minWidth": 1,
 "width": 115.05,
 "children": [
  "this.Container_EF8F8BD8_E386_8E02_41E5_FC5C5513733A"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "right": "0%",
 "top": "0%",
 "scrollBarOpacity": 0.5,
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "shadow": false,
 "verticalAlign": "top",
 "height": 641,
 "gap": 10,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "overflow": "scroll",
 "minHeight": 1,
 "layout": "absolute",
 "data": {
  "name": "-- SETTINGS"
 }
},
{
 "propagateClick": false,
 "paddingLeft": 0,
 "id": "Container_4041C033_7558_FB6E_41CE_BFE427F3AF92",
 "left": "0%",
 "scrollBarColor": "#000000",
 "scrollBarWidth": 10,
 "minWidth": 1,
 "width": 330,
 "children": [
  "this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4",
  "this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "top": "0%",
 "scrollBarOpacity": 0.5,
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "shadow": false,
 "verticalAlign": "top",
 "height": "100%",
 "gap": 10,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "overflow": "scroll",
 "minHeight": 1,
 "layout": "absolute",
 "data": {
  "name": "--- LEFT PANEL 4 (Community)"
 }
},
{
 "visible": false,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 0,
 "id": "Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15",
 "left": "0%",
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "scrollBarWidth": 10,
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_39A197B1_0C06_62AF_419A_D15E4DDD2528"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "right": "0%",
 "creationPolicy": "inAdvance",
 "backgroundColorDirection": "vertical",
 "top": "0%",
 "paddingRight": 0,
 "bottom": "0%",
 "contentOpaque": false,
 "shadow": false,
 "verticalAlign": "top",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, false, 0, null, null, false)",
 "scrollBarMargin": 2,
 "gap": 10,
 "class": "Container",
 "backgroundOpacity": 0.6,
 "paddingBottom": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "overflow": "scroll",
 "minHeight": 1,
 "layout": "absolute",
 "data": {
  "name": "--PANORAMA LIST"
 }
},
{
 "visible": false,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 0,
 "id": "Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7",
 "left": "0%",
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "scrollBarWidth": 10,
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_221C1648_0C06_E5FD_4180_8A2E8B66315E",
  "this.Container_221B3648_0C06_E5FD_4199_FCE031AE003B"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "right": "0%",
 "creationPolicy": "inAdvance",
 "backgroundColorDirection": "vertical",
 "top": "0%",
 "paddingRight": 0,
 "bottom": "0%",
 "contentOpaque": false,
 "shadow": false,
 "verticalAlign": "top",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7, false, 0, null, null, false)",
 "scrollBarMargin": 2,
 "gap": 10,
 "class": "Container",
 "backgroundOpacity": 0.6,
 "paddingBottom": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "overflow": "scroll",
 "minHeight": 1,
 "layout": "absolute",
 "data": {
  "name": "--LOCATION"
 }
},
{
 "visible": false,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 0,
 "id": "Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41",
 "left": "0%",
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "scrollBarWidth": 10,
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_2F8A6686_0D4F_6B71_4174_A02FE43588D3"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "right": "0%",
 "creationPolicy": "inAdvance",
 "backgroundColorDirection": "vertical",
 "top": "0%",
 "paddingRight": 0,
 "bottom": "0%",
 "contentOpaque": false,
 "shadow": false,
 "verticalAlign": "top",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41, false, 0, null, null, false)",
 "scrollBarMargin": 2,
 "gap": 10,
 "class": "Container",
 "backgroundOpacity": 0.6,
 "paddingBottom": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "overflow": "scroll",
 "minHeight": 1,
 "layout": "absolute",
 "data": {
  "name": "--FLOORPLAN"
 }
},
{
 "visible": false,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 0,
 "id": "Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E",
 "left": "0%",
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "scrollBarWidth": 10,
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_2A193C4C_0D3B_DFF0_4161_A2CD128EF536"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "right": "0%",
 "creationPolicy": "inAdvance",
 "backgroundColorDirection": "vertical",
 "top": "0%",
 "paddingRight": 0,
 "bottom": "0%",
 "contentOpaque": false,
 "shadow": false,
 "verticalAlign": "top",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E, false, 0, null, null, false)",
 "scrollBarMargin": 2,
 "gap": 10,
 "class": "Container",
 "backgroundOpacity": 0.6,
 "paddingBottom": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "overflow": "scroll",
 "minHeight": 1,
 "layout": "absolute",
 "data": {
  "name": "--PHOTOALBUM"
 }
},
{
 "visible": false,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 0,
 "id": "Container_1E18823C_57F1_802D_41C1_C325A6BB2CA9",
 "left": "0%",
 "propagateClick": true,
 "scrollBarColor": "#04A3E1",
 "scrollBarWidth": 10,
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_1E19923C_57F1_802D_41C4_18DBE75E48C1",
  "this.Container_1E18A23C_57F1_802D_41B9_D08FA26C7F4C"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "right": "0%",
 "creationPolicy": "inAdvance",
 "backgroundColorDirection": "vertical",
 "top": "0%",
 "paddingRight": 0,
 "bottom": "0%",
 "contentOpaque": false,
 "shadow": false,
 "verticalAlign": "top",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_1E18823C_57F1_802D_41C1_C325A6BB2CA9, false, 0, null, null, false)",
 "scrollBarMargin": 2,
 "gap": 10,
 "class": "Container",
 "backgroundOpacity": 0.6,
 "paddingBottom": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "overflow": "scroll",
 "minHeight": 1,
 "layout": "absolute",
 "data": {
  "name": "--REALTOR"
 }
},
{
 "propagateClick": false,
 "paddingLeft": 0,
 "id": "Image_D0039F75_DFE4_2586_41E7_57B2E7A03860",
 "minWidth": 1,
 "width": 143.6,
 "borderSize": 0,
 "right": "1.45%",
 "url": "skin/Image_D0039F75_DFE4_2586_41E7_57B2E7A03860.png",
 "verticalAlign": "middle",
 "top": "0%",
 "paddingRight": 0,
 "bottom": "88.15%",
 "shadow": false,
 "maxWidth": 1283,
 "class": "Image",
 "paddingBottom": 0,
 "maxHeight": 468,
 "backgroundOpacity": 0,
 "scaleMode": "fit_inside",
 "borderRadius": 0,
 "horizontalAlign": "center",
 "paddingTop": 0,
 "minHeight": 1,
 "data": {
  "name": "Image4030"
 }
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_BA638A41_B1E7_546E_41E5_CB9EB108BF1B, this.camera_F6131373_E67D_46F2_41B1_B0CFE8E13C2D); this.mainPlayList.set('selectedIndex', 3)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Arrow 05a"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 45.09,
   "image": "this.AnimatedImageResource_AD12DB51_BBFE_7098_41DD_8D123D4505A0",
   "pitch": -34.39,
   "yaw": 149.94,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A1DF9798_B1FD_5C1F_41D4_A9F8F4A52B55",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 45.09,
   "yaw": 149.94,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA639DE7_B1E7_4C32_41E3_9470B15291AB_0_HS_0_0_0_map.gif",
      "width": 21,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -34.39
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 3)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Arrow 05a"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 38.85,
   "image": "this.AnimatedImageResource_AD111B51_BBFE_7098_41DA_FBA42AF1AB51",
   "pitch": -44.68,
   "yaw": -3.81,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_BE874317_B1E5_5412_41D9_46CE1374FBAF",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 38.85,
   "yaw": -3.81,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA68968B_B1E4_BCF1_41D6_4205B56EF235_0_HS_0_0_0_map.gif",
      "width": 21,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -44.68
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_BA6A822A_B1E4_D432_41B8_C0BE3F62BF39, this.camera_F631830D_E67D_4617_41B1_5C9F1A35532C); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Arrow 05a"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 41.08,
   "image": "this.AnimatedImageResource_AD11DB51_BBFE_7098_41D9_A92014FEAD63",
   "pitch": -41.25,
   "yaw": -178.16,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_BE4EDA18_B1E5_741E_41CB_DBA8BAC0D8D6",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 41.08,
   "yaw": -178.16,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA68968B_B1E4_BCF1_41D6_4205B56EF235_0_HS_1_0_0_map.gif",
      "width": 21,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -41.25
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_BA68968B_B1E4_BCF1_41D6_4205B56EF235, this.camera_F62592D7_E67D_4633_41A7_414A5DEDBC32); this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Arrow 05a"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 38.38,
   "image": "this.AnimatedImageResource_AD127B51_BBFE_7098_41E0_82DA6E447627",
   "pitch": -45.37,
   "yaw": -179.52,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_BE33D3C4_B1E4_B476_41DC_87EE19B845AC",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 38.38,
   "yaw": -179.52,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA638A41_B1E7_546E_41E5_CB9EB108BF1B_0_HS_0_0_0_map.gif",
      "width": 21,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -45.37
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Arrow 05a Left-Up"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 30.53,
   "image": "this.AnimatedImageResource_AD123B51_BBFE_7098_41C4_0E15AD647520",
   "pitch": -47.74,
   "yaw": 2.65,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_A06B5937_B1E5_5412_41E1_E9B505A5B682",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 30.53,
   "yaw": 2.65,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA638A41_B1E7_546E_41E5_CB9EB108BF1B_0_HS_1_0_0_map.gif",
      "width": 24,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -47.74
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Arrow 05a"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 42.14,
   "image": "this.AnimatedImageResource_AD10AB51_BBFE_7098_41DC_20C775CF4A04",
   "pitch": -39.53,
   "yaw": -3.81,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_BF0143AC_B1EC_B436_41E0_9960DEDA7B90",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 42.14,
   "yaw": -3.81,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA6A822A_B1E4_D432_41B8_C0BE3F62BF39_0_HS_0_0_0_map.gif",
      "width": 21,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -39.53
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_BA989CFD_B1E4_CC11_41C3_CBEF05F9A169, this.camera_F603E33D_E67D_4676_41E4_FEE0729F7ED5); this.mainPlayList.set('selectedIndex', 0)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Arrow 05a"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 40.42,
   "image": "this.AnimatedImageResource_AD116B51_BBFE_7098_41E6_4A15DEEE7BA6",
   "pitch": -42.28,
   "yaw": -177.8,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_BEF9B965_B1EC_D431_41B7_A60ADF7E1AE2",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 40.42,
   "yaw": -177.8,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA6A822A_B1E4_D432_41B8_C0BE3F62BF39_0_HS_1_0_0_map.gif",
      "width": 21,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -42.28
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Arrow 05a"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 40.2,
   "image": "this.AnimatedImageResource_AD1F9B51_BBFE_7098_41E4_5B9238CE10CA",
   "pitch": -42.62,
   "yaw": -0.03,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_BFC63FAB_B1EC_CC32_41C4_180DB8648D76",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 40.2,
   "yaw": -0.03,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA989CFD_B1E4_CC11_41C3_CBEF05F9A169_0_HS_0_0_0_map.gif",
      "width": 21,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -42.62
  }
 ]
},
{
 "propagateClick": true,
 "paddingLeft": 0,
 "id": "Container_EF8F8BD8_E386_8E02_41E5_FC5C5513733A",
 "scrollBarColor": "#000000",
 "scrollBarWidth": 10,
 "minWidth": 1,
 "width": 110,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "right": "0%",
 "verticalAlign": "middle",
 "top": "0%",
 "scrollBarOpacity": 0.5,
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "shadow": false,
 "height": 110,
 "gap": 10,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "horizontalAlign": "center",
 "paddingTop": 0,
 "overflow": "visible",
 "minHeight": 1,
 "layout": "horizontal",
 "data": {
  "name": "button menu sup"
 }
},
{
 "propagateClick": true,
 "paddingLeft": 0,
 "id": "Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4",
 "left": "0%",
 "scrollBarColor": "#000000",
 "scrollBarWidth": 10,
 "minWidth": 1,
 "width": 66,
 "children": [
  "this.Container_21F34780_3014_BF93_41A2_9BF700588BEC",
  "this.IconButton_223F0171_3014_B375_41C1_61063C3D73B3"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "top": "0%",
 "scrollBarOpacity": 0.5,
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "shadow": false,
 "verticalAlign": "top",
 "height": "100%",
 "gap": 10,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "overflow": "scroll",
 "minHeight": 1,
 "layout": "absolute",
 "data": {
  "name": "- COLLAPSE"
 }
},
{
 "propagateClick": false,
 "paddingLeft": 0,
 "id": "Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD",
 "scrollBarColor": "#000000",
 "scrollBarWidth": 10,
 "minWidth": 1,
 "width": 330,
 "children": [
  "this.Container_4521E58D_74A8_853A_418A_CF7FF914DD83",
  "this.IconButton_1AF35943_2D07_479B_41AF_FBC8A1477882"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "right": 0,
 "top": "0%",
 "scrollBarOpacity": 0.5,
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "shadow": false,
 "verticalAlign": "top",
 "height": "100%",
 "gap": 10,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "overflow": "visible",
 "minHeight": 1,
 "layout": "absolute",
 "data": {
  "name": "- EXPANDED"
 }
},
{
 "shadowVerticalLength": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 0,
 "id": "Container_39A197B1_0C06_62AF_419A_D15E4DDD2528",
 "left": "15%",
 "scrollBarColor": "#000000",
 "scrollBarWidth": 10,
 "shadowColor": "#000000",
 "shadowHorizontalLength": 0,
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_3A67552A_0C3A_67BD_4195_ECE46CCB34EA",
  "this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "right": "15%",
 "backgroundColorDirection": "vertical",
 "verticalAlign": "top",
 "top": "10%",
 "paddingRight": 0,
 "data": {
  "name": "Global"
 },
 "bottom": "10%",
 "contentOpaque": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "shadow": true,
 "scrollBarMargin": 2,
 "shadowBlurRadius": 25,
 "gap": 10,
 "class": "Container",
 "shadowOpacity": 0.3,
 "backgroundOpacity": 1,
 "paddingBottom": 0,
 "shadowSpread": 1,
 "borderRadius": 0,
 "horizontalAlign": "center",
 "paddingTop": 0,
 "overflow": "visible",
 "minHeight": 1,
 "layout": "absolute",
 "propagateClick": true
},
{
 "shadowVerticalLength": 0,
 "visible": false,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 0,
 "id": "Container_221C1648_0C06_E5FD_4180_8A2E8B66315E",
 "left": "15%",
 "scrollBarColor": "#000000",
 "scrollBarWidth": 10,
 "shadowColor": "#000000",
 "shadowHorizontalLength": 0,
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "children": [
  "this.WebFrame_22F9EEFF_0C1A_2293_4165_411D4444EFEA"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "right": "15%",
 "backgroundColorDirection": "vertical",
 "verticalAlign": "top",
 "top": "10%",
 "paddingRight": 0,
 "data": {
  "name": "Global"
 },
 "bottom": "10%",
 "contentOpaque": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "shadow": true,
 "scrollBarMargin": 2,
 "shadowBlurRadius": 25,
 "gap": 10,
 "class": "Container",
 "shadowOpacity": 0.3,
 "backgroundOpacity": 1,
 "paddingBottom": 0,
 "shadowSpread": 1,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "overflow": "scroll",
 "minHeight": 1,
 "layout": "horizontal",
 "propagateClick": true
},
{
 "visible": false,
 "propagateClick": true,
 "paddingLeft": 0,
 "id": "Container_221B3648_0C06_E5FD_4199_FCE031AE003B",
 "left": "15%",
 "scrollBarColor": "#000000",
 "scrollBarWidth": 10,
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "right": "15%",
 "verticalAlign": "top",
 "top": "10%",
 "paddingRight": 20,
 "bottom": "80%",
 "contentOpaque": false,
 "shadow": false,
 "scrollBarMargin": 2,
 "gap": 10,
 "class": "Container",
 "backgroundOpacity": 0,
 "paddingBottom": 0,
 "borderRadius": 0,
 "horizontalAlign": "right",
 "paddingTop": 20,
 "overflow": "visible",
 "minHeight": 1,
 "layout": "vertical",
 "data": {
  "name": "Container X global"
 }
},
{
 "shadowVerticalLength": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 0,
 "id": "Container_2F8A6686_0D4F_6B71_4174_A02FE43588D3",
 "left": "15%",
 "scrollBarColor": "#000000",
 "scrollBarWidth": 10,
 "shadowColor": "#000000",
 "shadowHorizontalLength": 0,
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "children": [
  "this.MapViewer",
  "this.Container_2F8A7686_0D4F_6B71_41A9_1A894413085C"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "right": "15%",
 "backgroundColorDirection": "vertical",
 "verticalAlign": "top",
 "top": "10%",
 "paddingRight": 0,
 "data": {
  "name": "Global"
 },
 "bottom": "10%",
 "contentOpaque": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "shadow": true,
 "scrollBarMargin": 2,
 "shadowBlurRadius": 25,
 "gap": 10,
 "class": "Container",
 "shadowOpacity": 0.3,
 "backgroundOpacity": 1,
 "paddingBottom": 0,
 "shadowSpread": 1,
 "borderRadius": 0,
 "horizontalAlign": "center",
 "paddingTop": 0,
 "overflow": "visible",
 "minHeight": 1,
 "layout": "absolute",
 "propagateClick": true
},
{
 "shadowVerticalLength": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 0,
 "id": "Container_2A193C4C_0D3B_DFF0_4161_A2CD128EF536",
 "left": "15%",
 "scrollBarColor": "#000000",
 "scrollBarWidth": 10,
 "shadowColor": "#000000",
 "shadowHorizontalLength": 0,
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_2A19EC4C_0D3B_DFF0_414D_37145C22C5BC"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "right": "15%",
 "backgroundColorDirection": "vertical",
 "verticalAlign": "top",
 "top": "10%",
 "paddingRight": 0,
 "data": {
  "name": "Global"
 },
 "bottom": "10%",
 "contentOpaque": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "shadow": true,
 "scrollBarMargin": 2,
 "shadowBlurRadius": 25,
 "gap": 10,
 "class": "Container",
 "shadowOpacity": 0.3,
 "backgroundOpacity": 1,
 "paddingBottom": 0,
 "shadowSpread": 1,
 "borderRadius": 0,
 "horizontalAlign": "center",
 "paddingTop": 0,
 "overflow": "visible",
 "minHeight": 1,
 "layout": "vertical",
 "propagateClick": true
},
{
 "shadowVerticalLength": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 0,
 "id": "Container_1E19923C_57F1_802D_41C4_18DBE75E48C1",
 "left": "15%",
 "scrollBarColor": "#000000",
 "scrollBarWidth": 10,
 "shadowColor": "#000000",
 "shadowHorizontalLength": 0,
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_1E19E23C_57F1_802D_41D1_9B8B4D1D2BBD",
  "this.Container_1E19D23C_57F1_802D_41B0_92437DF80B82"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "right": "15%",
 "backgroundColorDirection": "vertical",
 "verticalAlign": "top",
 "top": "10%",
 "paddingRight": 0,
 "data": {
  "name": "Global"
 },
 "bottom": "10%",
 "contentOpaque": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "shadow": true,
 "scrollBarMargin": 2,
 "shadowBlurRadius": 25,
 "gap": 10,
 "class": "Container",
 "shadowOpacity": 0.3,
 "backgroundOpacity": 1,
 "paddingBottom": 0,
 "shadowSpread": 1,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "overflow": "scroll",
 "minHeight": 1,
 "layout": "horizontal",
 "propagateClick": false
},
{
 "propagateClick": false,
 "paddingLeft": 0,
 "id": "Container_1E18A23C_57F1_802D_41B9_D08FA26C7F4C",
 "left": "15%",
 "scrollBarColor": "#000000",
 "scrollBarWidth": 10,
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "children": [
  "this.IconButton_1E18B23C_57F1_802D_41C8_61C0F9BCC1FF"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "right": "15%",
 "verticalAlign": "top",
 "top": "10%",
 "paddingRight": 20,
 "bottom": "80%",
 "contentOpaque": false,
 "shadow": false,
 "scrollBarMargin": 2,
 "gap": 10,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "horizontalAlign": "right",
 "paddingTop": 20,
 "overflow": "visible",
 "minHeight": 1,
 "layout": "vertical",
 "data": {
  "name": "Container X global"
 }
},
{
 "rowCount": 6,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_BA639DE7_B1E7_4C32_41E3_9470B15291AB_0_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 540
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_AD12DB51_BBFE_7098_41DD_8D123D4505A0",
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_BA68968B_B1E4_BCF1_41D6_4205B56EF235_0_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 540
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_AD111B51_BBFE_7098_41DA_FBA42AF1AB51",
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_BA68968B_B1E4_BCF1_41D6_4205B56EF235_0_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 540
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_AD11DB51_BBFE_7098_41D9_A92014FEAD63",
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_BA638A41_B1E7_546E_41E5_CB9EB108BF1B_0_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 540
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_AD127B51_BBFE_7098_41E0_82DA6E447627",
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_BA638A41_B1E7_546E_41E5_CB9EB108BF1B_0_HS_1_0.png",
   "width": 560,
   "class": "ImageResourceLevel",
   "height": 540
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_AD123B51_BBFE_7098_41C4_0E15AD647520",
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_BA6A822A_B1E4_D432_41B8_C0BE3F62BF39_0_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 540
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_AD10AB51_BBFE_7098_41DC_20C775CF4A04",
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_BA6A822A_B1E4_D432_41B8_C0BE3F62BF39_0_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 540
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_AD116B51_BBFE_7098_41E6_4A15DEEE7BA6",
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_BA989CFD_B1E4_CC11_41C3_CBEF05F9A169_0_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 540
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_AD1F9B51_BBFE_7098_41E4_5B9238CE10CA",
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "backgroundColorRatios": [
  0
 ],
 "paddingLeft": 0,
 "id": "Container_21F34780_3014_BF93_41A2_9BF700588BEC",
 "left": "0%",
 "propagateClick": true,
 "width": 36,
 "scrollBarColor": "#000000",
 "scrollBarWidth": 10,
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical",
 "verticalAlign": "top",
 "top": "0%",
 "scrollBarOpacity": 0.5,
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "shadow": false,
 "backgroundColor": [
  "#000000"
 ],
 "height": "100%",
 "gap": 10,
 "class": "Container",
 "backgroundOpacity": 0.4,
 "paddingBottom": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "overflow": "scroll",
 "minHeight": 1,
 "layout": "absolute",
 "data": {
  "name": "Container black"
 }
},
{
 "propagateClick": true,
 "paddingLeft": 0,
 "id": "IconButton_223F0171_3014_B375_41C1_61063C3D73B3",
 "left": 10,
 "minWidth": 1,
 "width": 50,
 "borderSize": 0,
 "transparencyActive": true,
 "verticalAlign": "middle",
 "top": "40%",
 "iconURL": "skin/IconButton_223F0171_3014_B375_41C1_61063C3D73B3.png",
 "paddingRight": 0,
 "bottom": "40%",
 "shadow": false,
 "maxWidth": 80,
 "mode": "push",
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, false, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, true, 0, null, null, false)",
 "rollOverIconURL": "skin/IconButton_223F0171_3014_B375_41C1_61063C3D73B3_rollover.png",
 "class": "IconButton",
 "maxHeight": 80,
 "backgroundOpacity": 0,
 "paddingBottom": 0,
 "borderRadius": 0,
 "horizontalAlign": "center",
 "paddingTop": 0,
 "minHeight": 1,
 "cursor": "hand",
 "data": {
  "name": "IconButton arrow"
 }
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 0,
 "id": "Container_4521E58D_74A8_853A_418A_CF7FF914DD83",
 "left": "0%",
 "scrollBarWidth": 10,
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "children": [
  "this.Container_0B85764A_2D07_4D95_41A5_3AC872515A8C"
 ],
 "backgroundColorDirection": "vertical",
 "verticalAlign": "top",
 "top": "0%",
 "width": "90%",
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "shadow": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "height": "100%",
 "gap": 10,
 "class": "Container",
 "backgroundOpacity": 0.3,
 "paddingBottom": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "overflow": "scroll",
 "minHeight": 1,
 "layout": "absolute",
 "data": {
  "name": "Container"
 },
 "propagateClick": false
},
{
 "propagateClick": true,
 "paddingLeft": 0,
 "id": "IconButton_1AF35943_2D07_479B_41AF_FBC8A1477882",
 "minWidth": 1,
 "width": 50,
 "borderSize": 0,
 "right": 9,
 "transparencyActive": true,
 "verticalAlign": "middle",
 "top": "40%",
 "iconURL": "skin/IconButton_1AF35943_2D07_479B_41AF_FBC8A1477882.png",
 "paddingRight": 0,
 "bottom": "40%",
 "shadow": false,
 "maxWidth": 50,
 "mode": "push",
 "click": "this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false)",
 "rollOverIconURL": "skin/IconButton_1AF35943_2D07_479B_41AF_FBC8A1477882_rollover.png",
 "class": "IconButton",
 "maxHeight": 50,
 "backgroundOpacity": 0,
 "paddingBottom": 0,
 "borderRadius": 0,
 "horizontalAlign": "center",
 "paddingTop": 0,
 "minHeight": 1,
 "cursor": "hand",
 "data": {
  "name": "IconButton collapse"
 }
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 0,
 "id": "Container_3A67552A_0C3A_67BD_4195_ECE46CCB34EA",
 "scrollBarWidth": 10,
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "children": [
  "this.IconButton_38922473_0C06_2593_4199_C585853A1AB3"
 ],
 "backgroundColorDirection": "vertical",
 "verticalAlign": "top",
 "width": "100%",
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "height": 140,
 "shadow": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "gap": 10,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0.3,
 "paddingTop": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "overflow": "scroll",
 "minHeight": 1,
 "layout": "absolute",
 "data": {
  "name": "header"
 },
 "propagateClick": true
},
{
 "id": "ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0",
 "left": 0,
 "scrollBarColor": "#04A3E1",
 "itemMode": "normal",
 "itemLabelFontStyle": "italic",
 "minWidth": 1,
 "minHeight": 1,
 "scrollBarOpacity": 0.5,
 "itemLabelHorizontalAlign": "center",
 "selectedItemThumbnailShadowVerticalLength": 0,
 "itemMaxWidth": 1000,
 "scrollBarVisible": "rollOver",
 "rollOverItemThumbnailShadowColor": "#04A3E1",
 "rollOverItemThumbnailShadowVerticalLength": 0,
 "itemMaxHeight": 1000,
 "itemThumbnailOpacity": 1,
 "selectedItemThumbnailShadowHorizontalLength": 0,
 "width": "100%",
 "itemLabelFontFamily": "Oswald",
 "verticalAlign": "middle",
 "itemBorderRadius": 0,
 "itemPaddingRight": 3,
 "paddingRight": 70,
 "selectedItemThumbnailShadowBlurRadius": 16,
 "shadow": false,
 "height": "92%",
 "itemPaddingLeft": 3,
 "itemHorizontalAlign": "center",
 "itemLabelPosition": "bottom",
 "rollOverItemThumbnailShadowBlurRadius": 0,
 "selectedItemLabelFontColor": "#04A3E1",
 "itemOpacity": 1,
 "itemBackgroundOpacity": 0,
 "class": "ThumbnailGrid",
 "backgroundOpacity": 0,
 "itemThumbnailBorderRadius": 0,
 "itemPaddingTop": 3,
 "itemBackgroundColor": [],
 "itemBackgroundColorRatios": [],
 "propagateClick": true,
 "itemWidth": 220,
 "paddingLeft": 70,
 "selectedItemThumbnailShadow": true,
 "itemMinHeight": 50,
 "borderSize": 0,
 "selectedItemLabelFontWeight": "bold",
 "itemLabelFontWeight": "normal",
 "itemLabelTextDecoration": "none",
 "rollOverItemLabelFontColor": "#04A3E1",
 "rollOverItemThumbnailShadow": true,
 "playList": "this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist",
 "bottom": -0.2,
 "itemLabelFontSize": 16,
 "itemMinWidth": 50,
 "scrollBarMargin": 2,
 "itemVerticalAlign": "top",
 "itemLabelFontColor": "#666666",
 "itemThumbnailScaleMode": "fit_outside",
 "itemHeight": 160,
 "gap": 26,
 "itemBackgroundColorDirection": "vertical",
 "itemThumbnailHeight": 125,
 "paddingBottom": 70,
 "itemThumbnailShadow": false,
 "borderRadius": 5,
 "horizontalAlign": "center",
 "rollOverItemThumbnailShadowHorizontalLength": 8,
 "paddingTop": 10,
 "itemLabelGap": 7,
 "itemThumbnailWidth": 220,
 "itemPaddingBottom": 3,
 "data": {
  "name": "ThumbnailList"
 },
 "scrollBarWidth": 10
},
{
 "backgroundColorRatios": [
  0
 ],
 "paddingLeft": 0,
 "id": "WebFrame_22F9EEFF_0C1A_2293_4165_411D4444EFEA",
 "minWidth": 1,
 "width": "100%",
 "borderSize": 0,
 "url": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14377.55330038866!2d-73.99492968084243!3d40.75084469078082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9f775f259%3A0x999668d0d7c3fd7d!2s400+5th+Ave%2C+New+York%2C+NY+10018!5e0!3m2!1ses!2sus!4v1467271743182\" width=\"600\" height=\"450\" frameborder=\"0\" style=\"border:0\" allowfullscreen>",
 "backgroundColorDirection": "vertical",
 "scrollEnabled": true,
 "paddingRight": 0,
 "shadow": false,
 "backgroundColor": [
  "#FFFFFF"
 ],
 "insetBorder": false,
 "height": "100%",
 "class": "WebFrame",
 "paddingBottom": 0,
 "backgroundOpacity": 1,
 "paddingTop": 0,
 "borderRadius": 0,
 "minHeight": 1,
 "data": {
  "name": "WebFrame"
 },
 "propagateClick": true
},
{
 "minHeight": 1,
 "progressBarBorderColor": "#0066FF",
 "progressBackgroundColorDirection": "vertical",
 "id": "MapViewer",
 "left": 0,
 "playbackBarBottom": 0,
 "toolTipShadowSpread": 0,
 "playbackBarHeadOpacity": 1,
 "data": {
  "name": "Floor Plan"
 },
 "progressBorderColor": "#FFFFFF",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "toolTipBorderColor": "#767676",
 "minWidth": 1,
 "width": "100%",
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipOpacity": 1,
 "toolTipFontSize": 12,
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "toolTipShadowBlurRadius": 3,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "paddingRight": 0,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarRight": 0,
 "toolTipFontWeight": "normal",
 "shadow": false,
 "toolTipPaddingBottom": 4,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 0,
 "playbackBarProgressBorderSize": 0,
 "height": "99.975%",
 "toolTipShadowColor": "#333333",
 "class": "ViewerArea",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionMode": "blending",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "playbackBarHeadShadowHorizontalLength": 0,
 "toolTipShadowOpacity": 1,
 "progressLeft": 0,
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarBorderSize": 0,
 "toolTipShadowVerticalLength": 0,
 "propagateClick": true,
 "playbackBarBackgroundOpacity": 1,
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "toolTipTextShadowOpacity": 0,
 "paddingLeft": 0,
 "playbackBarHeadShadowColor": "#000000",
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "borderSize": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "top": 0,
 "playbackBarOpacity": 1,
 "playbackBarHeadShadowVerticalLength": 0,
 "displayTooltipInTouchScreens": true,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "toolTipPaddingRight": 6,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarLeft": 0,
 "paddingBottom": 0,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "paddingTop": 0,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "transitionDuration": 500,
 "playbackBarHeadHeight": 15
},
{
 "paddingLeft": 0,
 "id": "Container_2F8A7686_0D4F_6B71_41A9_1A894413085C",
 "scrollBarColor": "#000000",
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "children": [
  "this.IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "verticalAlign": "top",
 "width": "100%",
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "shadow": false,
 "height": 140,
 "gap": 10,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "minHeight": 1,
 "layout": "absolute",
 "data": {
  "name": "header"
 },
 "propagateClick": true
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 0,
 "id": "Container_2A19EC4C_0D3B_DFF0_414D_37145C22C5BC",
 "scrollBarWidth": 10,
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "children": [
  "this.ViewerAreaLabeled_2A198C4C_0D3B_DFF0_419F_C9A785406D9C",
  "this.IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482",
  "this.IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510",
  "this.IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1"
 ],
 "backgroundColorDirection": "vertical",
 "verticalAlign": "top",
 "width": "100%",
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "shadow": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "height": "100%",
 "gap": 10,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0.3,
 "paddingTop": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "overflow": "visible",
 "minHeight": 1,
 "layout": "absolute",
 "data": {
  "name": "Container photo"
 },
 "propagateClick": true
},
{
 "backgroundColorRatios": [
  0
 ],
 "paddingLeft": 0,
 "id": "Container_1E19E23C_57F1_802D_41D1_9B8B4D1D2BBD",
 "scrollBarWidth": 10,
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "children": [
  "this.Image_1E19C23C_57F1_802D_41D1_9DC72DB5C1E1"
 ],
 "backgroundColorDirection": "vertical",
 "verticalAlign": "middle",
 "width": "55%",
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "shadow": false,
 "backgroundColor": [
  "#000000"
 ],
 "height": "100%",
 "gap": 10,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 1,
 "paddingTop": 0,
 "borderRadius": 0,
 "horizontalAlign": "center",
 "overflow": "scroll",
 "minHeight": 1,
 "layout": "absolute",
 "data": {
  "name": "-left"
 },
 "propagateClick": false
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 60,
 "id": "Container_1E19D23C_57F1_802D_41B0_92437DF80B82",
 "scrollBarWidth": 10,
 "minWidth": 460,
 "scrollBarOpacity": 0.51,
 "scrollBarColor": "#0069A3",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "children": [
  "this.Container_1E18223C_57F1_802D_41D5_C1ECF1EB519F",
  "this.Container_1E18323C_57F1_802D_41AC_3EB4DE555BBC",
  "this.Container_1E18523C_57F1_802D_41B1_88C86CD9A273"
 ],
 "backgroundColorDirection": "vertical",
 "verticalAlign": "top",
 "width": "45%",
 "paddingRight": 60,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "shadow": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "height": "100%",
 "gap": 0,
 "class": "Container",
 "paddingBottom": 20,
 "backgroundOpacity": 1,
 "paddingTop": 20,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "overflow": "visible",
 "minHeight": 1,
 "layout": "vertical",
 "data": {
  "name": "-right"
 },
 "propagateClick": false
},
{
 "paddingLeft": 0,
 "id": "IconButton_1E18B23C_57F1_802D_41C8_61C0F9BCC1FF",
 "minWidth": 50,
 "iconURL": "skin/IconButton_1E18B23C_57F1_802D_41C8_61C0F9BCC1FF.jpg",
 "borderSize": 0,
 "transparencyActive": false,
 "verticalAlign": "middle",
 "width": "25%",
 "paddingRight": 0,
 "shadow": false,
 "height": "75%",
 "maxWidth": 60,
 "mode": "push",
 "click": "this.setComponentVisibility(this.Container_1E18823C_57F1_802D_41C1_C325A6BB2CA9, false, 0, null, null, false)",
 "rollOverIconURL": "skin/IconButton_1E18B23C_57F1_802D_41C8_61C0F9BCC1FF_rollover.jpg",
 "class": "IconButton",
 "paddingBottom": 0,
 "maxHeight": 60,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_1E18B23C_57F1_802D_41C8_61C0F9BCC1FF_pressed.jpg",
 "horizontalAlign": "center",
 "paddingTop": 0,
 "minHeight": 50,
 "cursor": "hand",
 "data": {
  "name": "X"
 },
 "propagateClick": false
},
{
 "backgroundColorRatios": [
  0
 ],
 "paddingLeft": 40,
 "id": "Container_0B85764A_2D07_4D95_41A5_3AC872515A8C",
 "left": "0%",
 "scrollBarWidth": 10,
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
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
 "backgroundColorDirection": "vertical",
 "top": "0%",
 "width": "100%",
 "paddingRight": 40,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "shadow": false,
 "verticalAlign": "top",
 "backgroundColor": [
  "#000000"
 ],
 "height": "100%",
 "gap": 10,
 "class": "Container",
 "backgroundOpacity": 0.7,
 "paddingBottom": 40,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 40,
 "overflow": "scroll",
 "minHeight": 1,
 "layout": "absolute",
 "data": {
  "name": "- Buttons set"
 },
 "propagateClick": true
},
{
 "paddingLeft": 0,
 "id": "IconButton_38922473_0C06_2593_4199_C585853A1AB3",
 "minWidth": 50,
 "iconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3.jpg",
 "borderSize": 0,
 "right": 20,
 "transparencyActive": false,
 "verticalAlign": "top",
 "top": 20,
 "width": "100%",
 "paddingRight": 0,
 "shadow": false,
 "height": "36.14%",
 "maxWidth": 60,
 "mode": "push",
 "click": "this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, false, 0, null, null, false)",
 "rollOverIconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3_rollover.jpg",
 "class": "IconButton",
 "paddingBottom": 0,
 "maxHeight": 60,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3_pressed.jpg",
 "horizontalAlign": "right",
 "paddingTop": 0,
 "minHeight": 50,
 "cursor": "hand",
 "data": {
  "name": "IconButton X"
 },
 "propagateClick": true
},
{
 "paddingLeft": 0,
 "id": "IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E",
 "minWidth": 50,
 "iconURL": "skin/IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E.jpg",
 "borderSize": 0,
 "right": 20,
 "transparencyActive": false,
 "verticalAlign": "top",
 "top": 20,
 "width": "100%",
 "paddingRight": 0,
 "shadow": false,
 "height": "36.14%",
 "maxWidth": 60,
 "mode": "push",
 "click": "this.setComponentVisibility(this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41, false, 0, null, null, false)",
 "rollOverIconURL": "skin/IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E_rollover.jpg",
 "class": "IconButton",
 "paddingBottom": 0,
 "maxHeight": 60,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E_pressed.jpg",
 "horizontalAlign": "right",
 "paddingTop": 0,
 "minHeight": 50,
 "cursor": "hand",
 "data": {
  "name": "IconButton X"
 },
 "propagateClick": true
},
{
 "minHeight": 1,
 "progressBarBorderColor": "#0066FF",
 "progressBackgroundColorDirection": "vertical",
 "id": "ViewerAreaLabeled_2A198C4C_0D3B_DFF0_419F_C9A785406D9C",
 "left": "0%",
 "playbackBarBottom": 0,
 "toolTipShadowSpread": 0,
 "playbackBarHeadOpacity": 1,
 "data": {
  "name": "Viewer photoalbum 1"
 },
 "progressBorderColor": "#FFFFFF",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "toolTipBorderColor": "#767676",
 "minWidth": 1,
 "width": "100%",
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipOpacity": 1,
 "toolTipFontSize": 12,
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "toolTipShadowBlurRadius": 3,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "paddingRight": 0,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarRight": 0,
 "toolTipFontWeight": "normal",
 "shadow": false,
 "toolTipPaddingBottom": 4,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 0,
 "playbackBarProgressBorderSize": 0,
 "height": "100%",
 "toolTipShadowColor": "#333333",
 "class": "ViewerArea",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionMode": "blending",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "playbackBarHeadShadowHorizontalLength": 0,
 "toolTipShadowOpacity": 1,
 "progressLeft": 0,
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarBorderSize": 0,
 "toolTipShadowVerticalLength": 0,
 "propagateClick": true,
 "playbackBarBackgroundOpacity": 1,
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "toolTipTextShadowOpacity": 0,
 "paddingLeft": 0,
 "playbackBarHeadShadowColor": "#000000",
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "borderSize": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "top": "0%",
 "playbackBarOpacity": 1,
 "playbackBarHeadShadowVerticalLength": 0,
 "displayTooltipInTouchScreens": true,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "toolTipPaddingRight": 6,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarLeft": 0,
 "paddingBottom": 0,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "paddingTop": 0,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "transitionDuration": 500,
 "playbackBarHeadHeight": 15
},
{
 "paddingLeft": 0,
 "id": "IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482",
 "left": 10,
 "minWidth": 50,
 "iconURL": "skin/IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482.png",
 "borderSize": 0,
 "transparencyActive": false,
 "verticalAlign": "middle",
 "top": "20%",
 "width": "14.22%",
 "paddingRight": 0,
 "bottom": "20%",
 "shadow": false,
 "maxWidth": 60,
 "mode": "push",
 "rollOverIconURL": "skin/IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482_rollover.png",
 "class": "IconButton",
 "maxHeight": 60,
 "backgroundOpacity": 0,
 "paddingBottom": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482_pressed.png",
 "horizontalAlign": "center",
 "paddingTop": 0,
 "minHeight": 50,
 "cursor": "hand",
 "data": {
  "name": "IconButton <"
 },
 "propagateClick": true
},
{
 "paddingLeft": 0,
 "id": "IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510",
 "minWidth": 50,
 "iconURL": "skin/IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510.png",
 "borderSize": 0,
 "right": 10,
 "transparencyActive": false,
 "verticalAlign": "middle",
 "top": "20%",
 "width": "14.22%",
 "paddingRight": 0,
 "bottom": "20%",
 "shadow": false,
 "maxWidth": 60,
 "mode": "push",
 "rollOverIconURL": "skin/IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510_rollover.png",
 "class": "IconButton",
 "maxHeight": 60,
 "backgroundOpacity": 0,
 "paddingBottom": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510_pressed.png",
 "horizontalAlign": "center",
 "paddingTop": 0,
 "minHeight": 50,
 "cursor": "hand",
 "data": {
  "name": "IconButton >"
 },
 "propagateClick": true
},
{
 "paddingLeft": 0,
 "id": "IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1",
 "minWidth": 50,
 "iconURL": "skin/IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1.jpg",
 "borderSize": 0,
 "right": 20,
 "transparencyActive": false,
 "verticalAlign": "top",
 "top": 20,
 "width": "10%",
 "paddingRight": 0,
 "shadow": false,
 "height": "10%",
 "maxWidth": 60,
 "mode": "push",
 "click": "this.setComponentVisibility(this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E, false, 0, null, null, false)",
 "rollOverIconURL": "skin/IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1_rollover.jpg",
 "class": "IconButton",
 "paddingBottom": 0,
 "maxHeight": 60,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1_pressed.jpg",
 "horizontalAlign": "right",
 "paddingTop": 0,
 "minHeight": 50,
 "cursor": "hand",
 "data": {
  "name": "IconButton X"
 },
 "propagateClick": true
},
{
 "paddingLeft": 0,
 "id": "Image_1E19C23C_57F1_802D_41D1_9DC72DB5C1E1",
 "left": "0%",
 "minWidth": 1,
 "width": "100%",
 "borderSize": 0,
 "url": "skin/Image_1E19C23C_57F1_802D_41D1_9DC72DB5C1E1.jpg",
 "verticalAlign": "bottom",
 "top": "0%",
 "paddingRight": 0,
 "shadow": false,
 "height": "100%",
 "maxWidth": 2000,
 "class": "Image",
 "paddingBottom": 0,
 "maxHeight": 1000,
 "backgroundOpacity": 0,
 "scaleMode": "fit_outside",
 "borderRadius": 0,
 "horizontalAlign": "center",
 "paddingTop": 0,
 "minHeight": 1,
 "data": {
  "name": "Image40635"
 },
 "propagateClick": false
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 0,
 "id": "Container_1E18223C_57F1_802D_41D5_C1ECF1EB519F",
 "scrollBarWidth": 10,
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical",
 "verticalAlign": "top",
 "width": "100%",
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "shadow": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "height": "5%",
 "gap": 0,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0.3,
 "paddingTop": 20,
 "borderRadius": 0,
 "horizontalAlign": "right",
 "overflow": "scroll",
 "minHeight": 0,
 "layout": "horizontal",
 "data": {
  "name": "Container space"
 },
 "propagateClick": false
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 0,
 "id": "Container_1E18323C_57F1_802D_41AC_3EB4DE555BBC",
 "scrollBarWidth": 10,
 "minWidth": 100,
 "scrollBarOpacity": 0.79,
 "scrollBarColor": "#E73B2C",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "children": [
  "this.HTMLText_1E18123C_57F1_802D_41D2_B0CD0D6533F4",
  "this.Container_1E18623C_57F1_802D_41D5_C4D10C61A206"
 ],
 "backgroundColorDirection": "vertical",
 "verticalAlign": "top",
 "width": "100%",
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "shadow": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "height": "100%",
 "gap": 10,
 "class": "Container",
 "paddingBottom": 30,
 "backgroundOpacity": 0.3,
 "paddingTop": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "overflow": "scroll",
 "minHeight": 520,
 "layout": "vertical",
 "data": {
  "name": "Container text"
 },
 "propagateClick": false
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 0,
 "id": "Container_1E18523C_57F1_802D_41B1_88C86CD9A273",
 "propagateClick": false,
 "width": 370,
 "scrollBarColor": "#000000",
 "scrollBarWidth": 10,
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical",
 "verticalAlign": "top",
 "scrollBarOpacity": 0.5,
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "height": 40,
 "shadow": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "gap": 10,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0.3,
 "paddingTop": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "overflow": "scroll",
 "minHeight": 1,
 "layout": "horizontal",
 "data": {
  "name": "Container space"
 }
},
{
 "paddingLeft": 0,
 "id": "Container_0A898462_2D0B_4D94_41B3_BDB53B7688EE",
 "left": "0%",
 "scrollBarWidth": 10,
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "children": [
  "this.Container_106C4A62_2D09_C594_41C0_0D00619DF541",
  "this.Button_0B73474A_2D18_CB95_41B5_180037BA80BC",
  "this.Container_1BA343A6_2D0B_4A9D_41A8_3A02573B3B89",
  "this.Button_1D2C4FDF_2D7F_BAAB_4198_FBD1E9E469FF",
  "this.Container_15283BED_2D08_DA6F_41C5_5635F0C6DB03",
  "this.Button_0399826A_2D79_4594_41BA_934A50D0E6B4",
  "this.Container_152401E8_2D0B_4694_41C5_9141C985F9C3",
  "this.Button_1D0C50DE_2D07_C6AD_41C1_CF4547A6CFAB",
  "this.Container_D69F9222_D993_2372_41E1_F8E460F167DC",
  "this.Button_D0D4C78E_DFE4_6485_41E4_5902ABCB15AD",
  "this.Container_D0D16A47_DFE4_2F83_41E8_F0D2632EDD88"
 ],
 "top": "39.67%",
 "width": "100%",
 "paddingRight": 0,
 "bottom": "18.29%",
 "contentOpaque": false,
 "shadow": false,
 "verticalAlign": "middle",
 "scrollBarMargin": 2,
 "gap": 0,
 "class": "Container",
 "backgroundOpacity": 0,
 "paddingBottom": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "overflow": "scroll",
 "minHeight": 1,
 "layout": "vertical",
 "data": {
  "name": "-Level 1"
 },
 "propagateClick": true
},
{
 "visible": false,
 "paddingLeft": 0,
 "id": "Container_2A2CB53C_310E_0014_41C3_AB834B10253B",
 "left": "0%",
 "scrollBarWidth": 10,
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
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
 "creationPolicy": "inAdvance",
 "top": "25%",
 "width": "100%",
 "paddingRight": 0,
 "bottom": "25%",
 "contentOpaque": false,
 "shadow": false,
 "verticalAlign": "middle",
 "scrollBarMargin": 2,
 "gap": 0,
 "class": "Container",
 "backgroundOpacity": 0,
 "paddingBottom": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "overflow": "scroll",
 "minHeight": 1,
 "layout": "vertical",
 "data": {
  "name": "-Level 2-1"
 },
 "propagateClick": true
},
{
 "visible": false,
 "paddingLeft": 0,
 "id": "Container_159EADDD_31FA_0014_41C8_8A5203EC627B",
 "left": "0%",
 "scrollBarWidth": 10,
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
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
 "creationPolicy": "inAdvance",
 "top": "25%",
 "width": "100%",
 "paddingRight": 0,
 "bottom": "25%",
 "contentOpaque": false,
 "shadow": false,
 "verticalAlign": "middle",
 "scrollBarMargin": 2,
 "gap": 0,
 "class": "Container",
 "backgroundOpacity": 0,
 "paddingBottom": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "overflow": "scroll",
 "minHeight": 1,
 "layout": "vertical",
 "data": {
  "name": "-Level 2-2"
 },
 "propagateClick": true
},
{
 "visible": false,
 "paddingLeft": 0,
 "id": "Container_17569D7D_31FA_0015_41C4_CBC688763A8D",
 "left": "0%",
 "scrollBarWidth": 10,
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
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
 "creationPolicy": "inAdvance",
 "top": "25%",
 "width": "100%",
 "paddingRight": 0,
 "bottom": "25%",
 "contentOpaque": false,
 "shadow": false,
 "verticalAlign": "middle",
 "scrollBarMargin": 2,
 "gap": 0,
 "class": "Container",
 "backgroundOpacity": 0,
 "paddingBottom": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "overflow": "scroll",
 "minHeight": 1,
 "layout": "vertical",
 "data": {
  "name": "-Level 2-3"
 },
 "propagateClick": true
},
{
 "visible": false,
 "paddingLeft": 0,
 "id": "Container_1758A215_31FA_0014_41B6_9A4A5384548B",
 "left": "0%",
 "scrollBarWidth": 10,
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
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
 "creationPolicy": "inAdvance",
 "top": "25%",
 "width": "100%",
 "paddingRight": 0,
 "bottom": "25%",
 "contentOpaque": false,
 "shadow": false,
 "verticalAlign": "middle",
 "scrollBarMargin": 2,
 "gap": 0,
 "class": "Container",
 "backgroundOpacity": 0,
 "paddingBottom": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "overflow": "scroll",
 "minHeight": 1,
 "layout": "vertical",
 "data": {
  "name": "-Level 2-4"
 },
 "propagateClick": true
},
{
 "visible": false,
 "paddingLeft": 0,
 "id": "Container_17EBA2B7_3106_0014_41A9_D6C96D0633AE",
 "left": "0%",
 "scrollBarWidth": 10,
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
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
 "creationPolicy": "inAdvance",
 "top": "25%",
 "width": "100%",
 "paddingRight": 0,
 "bottom": "25%",
 "contentOpaque": false,
 "shadow": false,
 "verticalAlign": "middle",
 "scrollBarMargin": 2,
 "gap": 0,
 "class": "Container",
 "backgroundOpacity": 0,
 "paddingBottom": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "overflow": "scroll",
 "minHeight": 1,
 "layout": "vertical",
 "data": {
  "name": "-Level 2-5"
 },
 "propagateClick": true
},
{
 "visible": false,
 "paddingLeft": 0,
 "id": "Container_168D8311_3106_01EC_41B0_F2D40886AB88",
 "left": "0%",
 "scrollBarWidth": 10,
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
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
 "creationPolicy": "inAdvance",
 "top": "25%",
 "width": "100%",
 "paddingRight": 0,
 "bottom": "25%",
 "contentOpaque": false,
 "shadow": false,
 "verticalAlign": "middle",
 "scrollBarMargin": 2,
 "gap": 0,
 "class": "Container",
 "backgroundOpacity": 0,
 "paddingBottom": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "overflow": "scroll",
 "minHeight": 1,
 "layout": "vertical",
 "data": {
  "name": "-Level 2-6"
 },
 "propagateClick": true
},
{
 "paddingLeft": 0,
 "id": "Image_D0E56C9F_DFE4_2483_41E0_68433BCB459C",
 "left": "2.44%",
 "minWidth": 1,
 "width": "89.862%",
 "borderSize": 0,
 "url": "skin/Image_D0E56C9F_DFE4_2483_41E0_68433BCB459C.jpeg",
 "verticalAlign": "middle",
 "top": "2.81%",
 "paddingRight": 0,
 "shadow": false,
 "height": "28.465%",
 "maxWidth": 720,
 "class": "Image",
 "paddingBottom": 0,
 "maxHeight": 638,
 "backgroundOpacity": 0,
 "scaleMode": "fit_inside",
 "borderRadius": 0,
 "horizontalAlign": "center",
 "paddingTop": 0,
 "minHeight": 1,
 "data": {
  "name": "Image3757"
 },
 "propagateClick": false
},
{
 "paddingLeft": 0,
 "id": "HTMLText_1E18123C_57F1_802D_41D2_B0CD0D6533F4",
 "scrollBarColor": "#04A3E1",
 "minWidth": 1,
 "scrollBarOpacity": 0,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "width": "100%",
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "shadow": false,
 "height": "46%",
 "class": "HTMLText",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:8.3vh;font-family:'Bebas Neue Bold';\">___</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:4.58vh;font-family:'Oswald';\"><B><I>LOREM IPSUM</I></B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:4.58vh;font-family:'Oswald';\"><B><I>DOLOR SIT AMET</I></B></SPAN></SPAN></DIV></div>",
 "paddingTop": 0,
 "scrollBarWidth": 10,
 "minHeight": 1,
 "data": {
  "name": "HTMLText18899"
 },
 "propagateClick": false
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 0,
 "id": "Container_1E18623C_57F1_802D_41D5_C4D10C61A206",
 "scrollBarWidth": 10,
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "children": [
  "this.Image_1E18723C_57F1_802D_41C5_8325536874A5",
  "this.HTMLText_1E18423C_57F1_802D_41C4_458DB7F892AC"
 ],
 "backgroundColorDirection": "vertical",
 "verticalAlign": "top",
 "width": "100%",
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "shadow": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "height": "75%",
 "gap": 10,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0.3,
 "paddingTop": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "overflow": "scroll",
 "minHeight": 1,
 "layout": "horizontal",
 "data": {
  "name": "- content"
 },
 "propagateClick": false
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 0,
 "id": "Container_106C4A62_2D09_C594_41C0_0D00619DF541",
 "scrollBarWidth": 10,
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical",
 "verticalAlign": "top",
 "width": "100%",
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "height": 1,
 "shadow": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "gap": 10,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0.3,
 "paddingTop": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "overflow": "scroll",
 "minHeight": 1,
 "layout": "absolute",
 "data": {
  "name": "line"
 },
 "propagateClick": true
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 10,
 "id": "Button_0B73474A_2D18_CB95_41B5_180037BA80BC",
 "data": {
  "name": "Button Location"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "minWidth": 1,
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.8,
 "borderSize": 0,
 "layout": "horizontal",
 "iconHeight": 32,
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "pressedLabel": "Inserdt Text",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "width": "100%",
 "paddingRight": 0,
 "shadow": false,
 "height": 50,
 "fontSize": "18px",
 "label": "INSTAGRAM",
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "click": "this.openLink('https://www.instagram.com/star.protecaoveicularjoinville/', '_blank')",
 "fontStyle": "italic",
 "class": "Button",
 "paddingBottom": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "iconWidth": 32,
 "minHeight": 1,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal",
 "propagateClick": true
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 0,
 "id": "Container_1BA343A6_2D0B_4A9D_41A8_3A02573B3B89",
 "scrollBarWidth": 10,
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical",
 "verticalAlign": "top",
 "width": "100%",
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "height": 1,
 "shadow": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "gap": 10,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0.3,
 "paddingTop": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "overflow": "scroll",
 "minHeight": 1,
 "layout": "absolute",
 "data": {
  "name": "line"
 },
 "propagateClick": true
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 10,
 "id": "Button_1D2C4FDF_2D7F_BAAB_4198_FBD1E9E469FF",
 "data": {
  "name": "Button Floorplan"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "minWidth": 1,
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.8,
 "borderSize": 0,
 "layout": "horizontal",
 "iconHeight": 32,
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "width": "100%",
 "paddingRight": 0,
 "shadow": false,
 "height": 50,
 "fontSize": "18px",
 "label": "FACEBOOK",
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "click": "this.openLink('https://www.facebook.com/star.joinvilleoficial/', '_blank')",
 "fontStyle": "italic",
 "class": "Button",
 "paddingBottom": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "iconWidth": 32,
 "minHeight": 1,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal",
 "propagateClick": true
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 0,
 "id": "Container_15283BED_2D08_DA6F_41C5_5635F0C6DB03",
 "scrollBarWidth": 10,
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical",
 "verticalAlign": "top",
 "width": "100%",
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "height": 1,
 "shadow": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "gap": 10,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0.3,
 "paddingTop": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "overflow": "scroll",
 "minHeight": 1,
 "layout": "absolute",
 "data": {
  "name": "line"
 },
 "propagateClick": true
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 10,
 "id": "Button_0399826A_2D79_4594_41BA_934A50D0E6B4",
 "data": {
  "name": "Button Photoalbum"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "minWidth": 1,
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.8,
 "borderSize": 0,
 "layout": "horizontal",
 "iconHeight": 32,
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "width": "100%",
 "paddingRight": 0,
 "shadow": false,
 "height": 50,
 "fontSize": "18px",
 "label": "WHATSAPP",
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "click": "this.openLink('http://wa.me/5547999430047', '_blank')",
 "fontStyle": "italic",
 "class": "Button",
 "paddingBottom": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "iconWidth": 32,
 "minHeight": 1,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal",
 "propagateClick": true
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 0,
 "id": "Container_152401E8_2D0B_4694_41C5_9141C985F9C3",
 "scrollBarWidth": 10,
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical",
 "verticalAlign": "top",
 "width": "100%",
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "height": 1,
 "shadow": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "gap": 10,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0.3,
 "paddingTop": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "overflow": "scroll",
 "minHeight": 1,
 "layout": "absolute",
 "data": {
  "name": "line"
 },
 "propagateClick": true
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 10,
 "id": "Button_1D0C50DE_2D07_C6AD_41C1_CF4547A6CFAB",
 "data": {
  "name": "Button Contact"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "minWidth": 1,
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.8,
 "borderSize": 0,
 "layout": "horizontal",
 "iconHeight": 32,
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "width": "100%",
 "paddingRight": 0,
 "shadow": false,
 "height": 50,
 "fontSize": "18px",
 "label": "TELEFONE",
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "click": "this.openLink('tel:04732785542', '_blank')",
 "fontStyle": "italic",
 "class": "Button",
 "paddingBottom": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "iconWidth": 32,
 "minHeight": 1,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal",
 "propagateClick": true
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 0,
 "id": "Container_D69F9222_D993_2372_41E1_F8E460F167DC",
 "scrollBarWidth": 10,
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "children": [
  "this.Button_D0DC1273_DFE4_1F83_41D3_3D5446768FEA"
 ],
 "backgroundColorDirection": "vertical",
 "verticalAlign": "top",
 "width": "100%",
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "height": 1,
 "shadow": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "gap": 10,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0.3,
 "paddingTop": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "overflow": "scroll",
 "minHeight": 1,
 "layout": "absolute",
 "data": {
  "name": "line"
 },
 "propagateClick": true
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 10,
 "id": "Button_D0D4C78E_DFE4_6485_41E4_5902ABCB15AD",
 "data": {
  "name": "Button Contact"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "minWidth": 1,
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.8,
 "borderSize": 0,
 "layout": "horizontal",
 "iconHeight": 32,
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "width": "100%",
 "paddingRight": 0,
 "shadow": false,
 "height": 50,
 "fontSize": "18px",
 "label": "LOCALIZA\u00c7\u00c3O",
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "click": "this.openLink('https://goo.gl/maps/E1XRcMEtJqvvBSrj6', '_blank')",
 "fontStyle": "italic",
 "class": "Button",
 "paddingBottom": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "iconWidth": 32,
 "minHeight": 1,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal",
 "propagateClick": true
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 0,
 "id": "Container_D0D16A47_DFE4_2F83_41E8_F0D2632EDD88",
 "scrollBarWidth": 10,
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "children": [
  "this.Button_D0F7B98B_DFE4_2C83_41E4_317D490638D3"
 ],
 "backgroundColorDirection": "vertical",
 "verticalAlign": "top",
 "width": "100%",
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "height": 1,
 "shadow": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "gap": 10,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0.3,
 "paddingTop": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "overflow": "scroll",
 "minHeight": 1,
 "layout": "absolute",
 "data": {
  "name": "line"
 },
 "propagateClick": true
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 5,
 "id": "Button_2A2DA53B_310E_001C_41C7_8885E712C50B",
 "data": {
  "name": "Button <BACK"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "minWidth": 1,
 "fontColor": "#FFFFFF",
 "iconURL": "skin/Button_2A2DA53B_310E_001C_41C7_8885E712C50B.png",
 "borderSize": 0,
 "layout": "horizontal",
 "iconHeight": 30,
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "rollOverFontFamily": "Oswald",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "rollOverBackgroundOpacity": 0.8,
 "width": "100%",
 "paddingRight": 0,
 "shadow": false,
 "rollOverFontSize": 18,
 "height": 50,
 "fontSize": 18,
 "label": "BACK",
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "iconBeforeLabel": true,
 "rollOverIconURL": "skin/Button_2A2DA53B_310E_001C_41C7_8885E712C50B_rollover.png",
 "click": "this.setComponentVisibility(this.Container_2A2CB53C_310E_0014_41C3_AB834B10253B, false, 0, null, null, false); this.setComponentVisibility(this.Container_0A898462_2D0B_4D94_41B3_BDB53B7688EE, true, 0, null, null, false)",
 "fontStyle": "italic",
 "class": "Button",
 "paddingBottom": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "iconWidth": 30,
 "minHeight": 1,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal",
 "propagateClick": true
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 0,
 "id": "Container_2A2DB53B_310E_001C_41BA_0206228E495C",
 "scrollBarWidth": 10,
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical",
 "verticalAlign": "top",
 "width": "100%",
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "height": 1,
 "shadow": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "gap": 10,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0.5,
 "paddingTop": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "overflow": "scroll",
 "minHeight": 1,
 "layout": "absolute",
 "data": {
  "name": "line"
 },
 "propagateClick": true
},
{
 "paddingLeft": 0,
 "id": "Container_1303E3BB_3106_001D_41C8_60D6F4D70B2F",
 "scrollBarColor": "#000000",
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "verticalAlign": "top",
 "width": "100%",
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "shadow": false,
 "height": 8,
 "gap": 10,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "minHeight": 1,
 "layout": "absolute",
 "data": {
  "name": "line separator"
 },
 "propagateClick": true
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 10,
 "id": "Button_2A2D853B_310E_001C_41C4_1C2E2BAFC35D",
 "width": "100%",
 "data": {
  "name": "Button text 1"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "minWidth": 1,
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.8,
 "borderSize": 0,
 "layout": "horizontal",
 "iconHeight": 32,
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "paddingRight": 0,
 "shadow": false,
 "height": 36,
 "fontSize": 18,
 "label": "Main Entrance",
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 15,
 "gap": 5,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "class": "Button",
 "paddingBottom": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "rollOverShadow": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "rollOverShadowBlurRadius": 18,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "iconWidth": 32,
 "minHeight": 1,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal",
 "propagateClick": true
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 10,
 "id": "Button_2A2DE53B_310E_001C_41BB_C7AB6950A4DD",
 "data": {
  "name": "Button text 2"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "minWidth": 1,
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.8,
 "borderSize": 0,
 "layout": "horizontal",
 "iconHeight": 32,
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "width": "100%",
 "paddingRight": 0,
 "shadow": false,
 "height": 36,
 "fontSize": 18,
 "label": "Lobby",
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 23,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "class": "Button",
 "paddingBottom": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "iconWidth": 32,
 "minHeight": 1,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal",
 "propagateClick": true
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 10,
 "id": "Button_2A2C253B_310E_001C_41B6_D3A7F4F68C3E",
 "data": {
  "name": "Button text 3"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "minWidth": 1,
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.8,
 "borderSize": 0,
 "layout": "horizontal",
 "iconHeight": 32,
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "pressedLabel": "Reception",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "width": "100%",
 "paddingRight": 0,
 "shadow": false,
 "height": 36,
 "fontSize": 18,
 "label": "Reception",
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "class": "Button",
 "paddingBottom": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "iconWidth": 32,
 "minHeight": 1,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal",
 "propagateClick": true
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 10,
 "id": "Button_2A2C053B_310E_001C_41A2_583DE489828C",
 "data": {
  "name": "Button text 4"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "minWidth": 1,
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.8,
 "borderSize": 0,
 "layout": "horizontal",
 "iconHeight": 32,
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "width": "100%",
 "paddingRight": 0,
 "shadow": false,
 "height": 36,
 "fontSize": 18,
 "label": "Meeting Area 1",
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "class": "Button",
 "paddingBottom": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "iconWidth": 32,
 "minHeight": 1,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal",
 "propagateClick": true
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 10,
 "id": "Button_2A2C753B_310E_001C_41C4_B649CCC20E3D",
 "data": {
  "name": "Button text 5"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "minWidth": 1,
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.8,
 "borderSize": 0,
 "layout": "horizontal",
 "iconHeight": 32,
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "width": "100%",
 "paddingRight": 0,
 "shadow": false,
 "height": 36,
 "fontSize": 18,
 "label": "Meeting Area 2",
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "class": "Button",
 "paddingBottom": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "iconWidth": 32,
 "minHeight": 1,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal",
 "propagateClick": true
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 10,
 "id": "Button_2A2C553C_310E_0014_41C4_86393D0ADCC7",
 "data": {
  "name": "Button text 6"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "minWidth": 1,
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.8,
 "borderSize": 0,
 "layout": "horizontal",
 "iconHeight": 32,
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "width": "100%",
 "paddingRight": 0,
 "shadow": false,
 "height": 36,
 "fontSize": 18,
 "label": "Bar",
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "class": "Button",
 "paddingBottom": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "iconWidth": 32,
 "minHeight": 1,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal",
 "propagateClick": true
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 10,
 "id": "Button_15EF2665_3106_0035_41AE_9BACA1A48D02",
 "data": {
  "name": "Button text 7"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "minWidth": 1,
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.8,
 "borderSize": 0,
 "layout": "horizontal",
 "iconHeight": 32,
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "width": "100%",
 "paddingRight": 0,
 "shadow": false,
 "height": 36,
 "fontSize": 18,
 "label": "Chill Out",
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "class": "Button",
 "paddingBottom": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "iconWidth": 32,
 "minHeight": 1,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal",
 "propagateClick": true
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 10,
 "id": "Button_15F5A318_3106_001C_41C5_9AA2EF2184CF",
 "data": {
  "name": "Button text 8"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "minWidth": 1,
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.8,
 "borderSize": 0,
 "layout": "horizontal",
 "iconHeight": 32,
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "width": "100%",
 "paddingRight": 0,
 "shadow": false,
 "height": 36,
 "fontSize": 18,
 "label": "Terrace",
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "class": "Button",
 "paddingBottom": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "iconWidth": 32,
 "minHeight": 1,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal",
 "propagateClick": true
},
{
 "textDecoration": "none",
 "visible": false,
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 0,
 "id": "Button_1203FDB8_3106_001C_41B6_C9BE8EDD0DA9",
 "data": {
  "name": "Button text 9"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "minWidth": 1,
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.8,
 "borderSize": 0,
 "layout": "horizontal",
 "iconHeight": 32,
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "width": "100%",
 "paddingRight": 0,
 "shadow": false,
 "height": 36,
 "fontSize": 18,
 "label": "Garden",
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "class": "Button",
 "paddingBottom": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "iconWidth": 32,
 "minHeight": 1,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal",
 "propagateClick": true
},
{
 "textDecoration": "none",
 "visible": false,
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 0,
 "id": "Button_13D4FC1E_310A_0017_41BA_DDA6D071C1BA",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "data": {
  "name": "Button text 10"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "minWidth": 1,
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.8,
 "borderSize": 0,
 "layout": "horizontal",
 "iconHeight": 32,
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "pressedBackgroundColorRatios": [
  0
 ],
 "iconBeforeLabel": true,
 "width": "100%",
 "paddingRight": 0,
 "shadow": false,
 "height": 36,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "class": "Button",
 "paddingBottom": 0,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "iconWidth": 32,
 "minHeight": 1,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal",
 "propagateClick": true
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 5,
 "id": "Button_15A15DDC_31FA_0014_41A4_CE4305FEC7D1",
 "data": {
  "name": "Button <BACK"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "minWidth": 1,
 "fontColor": "#FFFFFF",
 "iconURL": "skin/Button_15A15DDC_31FA_0014_41A4_CE4305FEC7D1.png",
 "borderSize": 0,
 "layout": "horizontal",
 "iconHeight": 30,
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "rollOverFontFamily": "Oswald",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "rollOverBackgroundOpacity": 0.8,
 "width": "100%",
 "paddingRight": 0,
 "shadow": false,
 "rollOverFontSize": 18,
 "height": 50,
 "fontSize": 18,
 "label": "BACK",
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "iconBeforeLabel": true,
 "rollOverIconURL": "skin/Button_15A15DDC_31FA_0014_41A4_CE4305FEC7D1_rollover.png",
 "click": "this.setComponentVisibility(this.Container_159EADDD_31FA_0014_41C8_8A5203EC627B, false, 0, null, null, false); this.setComponentVisibility(this.Container_0A898462_2D0B_4D94_41B3_BDB53B7688EE, true, 0, null, null, false)",
 "fontStyle": "italic",
 "class": "Button",
 "paddingBottom": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "iconWidth": 30,
 "minHeight": 1,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal",
 "propagateClick": true
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 0,
 "id": "Container_15A14DDC_31FA_0014_41BE_C93192DD207E",
 "scrollBarWidth": 10,
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical",
 "verticalAlign": "top",
 "width": "100%",
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "height": 1,
 "shadow": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "gap": 10,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0.5,
 "paddingTop": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "overflow": "scroll",
 "minHeight": 1,
 "layout": "absolute",
 "data": {
  "name": "line"
 },
 "propagateClick": true
},
{
 "paddingLeft": 0,
 "id": "Container_15A16DDC_31FA_0014_4199_0FBF7553300D",
 "scrollBarColor": "#000000",
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "verticalAlign": "top",
 "width": "100%",
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "shadow": false,
 "height": 8,
 "gap": 10,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "minHeight": 1,
 "layout": "absolute",
 "data": {
  "name": "line separator"
 },
 "propagateClick": true
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 10,
 "id": "Button_15A10DDC_31FA_0014_4185_021C898E177D",
 "width": "100%",
 "data": {
  "name": "Button text 1"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "minWidth": 1,
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.8,
 "borderSize": 0,
 "layout": "horizontal",
 "iconHeight": 32,
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "paddingRight": 0,
 "shadow": false,
 "height": 36,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 15,
 "gap": 5,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "class": "Button",
 "paddingBottom": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "rollOverShadow": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "rollOverShadowBlurRadius": 18,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "iconWidth": 32,
 "minHeight": 1,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal",
 "propagateClick": true
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 10,
 "id": "Button_15A13DDC_31FA_0014_41C5_41AE80876834",
 "data": {
  "name": "Button text 2"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "minWidth": 1,
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.8,
 "borderSize": 0,
 "layout": "horizontal",
 "iconHeight": 32,
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "width": "100%",
 "paddingRight": 0,
 "shadow": false,
 "height": 36,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 23,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "class": "Button",
 "paddingBottom": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "iconWidth": 32,
 "minHeight": 1,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal",
 "propagateClick": true
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 10,
 "id": "Button_15A12DDC_31FA_0014_416B_ED845741AE5F",
 "data": {
  "name": "Button text 3"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "minWidth": 1,
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.8,
 "borderSize": 0,
 "layout": "horizontal",
 "iconHeight": 32,
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "pressedLabel": "Lorem Ipsum",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "width": "100%",
 "paddingRight": 0,
 "shadow": false,
 "height": 36,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "class": "Button",
 "paddingBottom": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "iconWidth": 32,
 "minHeight": 1,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal",
 "propagateClick": true
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 10,
 "id": "Button_159EDDDC_31FA_0014_419A_61C18E43FE01",
 "data": {
  "name": "Button text 4"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "minWidth": 1,
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.8,
 "borderSize": 0,
 "layout": "horizontal",
 "iconHeight": 32,
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "width": "100%",
 "paddingRight": 0,
 "shadow": false,
 "height": 36,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "class": "Button",
 "paddingBottom": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "iconWidth": 32,
 "minHeight": 1,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal",
 "propagateClick": true
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 10,
 "id": "Button_159ECDDC_31FA_0014_41B9_2D5AB1021813",
 "data": {
  "name": "Button text 5"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "minWidth": 1,
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.8,
 "borderSize": 0,
 "layout": "horizontal",
 "iconHeight": 32,
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "width": "100%",
 "paddingRight": 0,
 "shadow": false,
 "height": 36,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "class": "Button",
 "paddingBottom": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "iconWidth": 32,
 "minHeight": 1,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal",
 "propagateClick": true
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 10,
 "id": "Button_159EFDDC_31FA_0014_41C6_9CF7032F84E0",
 "data": {
  "name": "Button text 6"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "minWidth": 1,
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.8,
 "borderSize": 0,
 "layout": "horizontal",
 "iconHeight": 32,
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "width": "100%",
 "paddingRight": 0,
 "shadow": false,
 "height": 36,
 "fontSize": 18,
 "label": "Lorem ipsum",
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "class": "Button",
 "paddingBottom": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "iconWidth": 32,
 "minHeight": 1,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal",
 "propagateClick": true
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 10,
 "id": "Button_159EEDDC_31FA_0014_41B6_22A86B2D2FEB",
 "data": {
  "name": "Button text 7"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "minWidth": 1,
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.8,
 "borderSize": 0,
 "layout": "horizontal",
 "iconHeight": 32,
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "width": "100%",
 "paddingRight": 0,
 "shadow": false,
 "height": 36,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "class": "Button",
 "paddingBottom": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "iconWidth": 32,
 "minHeight": 1,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal",
 "propagateClick": true
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 10,
 "id": "Button_159E9DDC_31FA_0015_41B6_CB1D433C7673",
 "data": {
  "name": "Button text 8"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "minWidth": 1,
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.8,
 "borderSize": 0,
 "layout": "horizontal",
 "iconHeight": 32,
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "width": "100%",
 "paddingRight": 0,
 "shadow": false,
 "height": 36,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "class": "Button",
 "paddingBottom": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "iconWidth": 32,
 "minHeight": 1,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal",
 "propagateClick": true
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 10,
 "id": "Button_159E8DDD_31FA_0014_41C5_F18F441AF371",
 "data": {
  "name": "Button text 9"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "minWidth": 1,
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.8,
 "borderSize": 0,
 "layout": "horizontal",
 "iconHeight": 32,
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "width": "100%",
 "paddingRight": 0,
 "shadow": false,
 "height": 36,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "class": "Button",
 "paddingBottom": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "iconWidth": 32,
 "minHeight": 1,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal",
 "propagateClick": true
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 10,
 "id": "Button_159EBDDD_31FA_0014_41C8_935504B30727",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "data": {
  "name": "Button text 10"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "minWidth": 1,
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.8,
 "borderSize": 0,
 "layout": "horizontal",
 "iconHeight": 32,
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "pressedBackgroundColorRatios": [
  0
 ],
 "iconBeforeLabel": true,
 "width": "100%",
 "paddingRight": 0,
 "shadow": false,
 "height": 36,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "class": "Button",
 "paddingBottom": 0,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "iconWidth": 32,
 "minHeight": 1,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal",
 "propagateClick": true
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 5,
 "id": "Button_1757CD7D_31FA_0015_4143_A9E37B16A50B",
 "data": {
  "name": "Button <BACK"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "minWidth": 1,
 "fontColor": "#FFFFFF",
 "iconURL": "skin/Button_1757CD7D_31FA_0015_4143_A9E37B16A50B.png",
 "borderSize": 0,
 "layout": "horizontal",
 "iconHeight": 30,
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "rollOverFontFamily": "Oswald",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "rollOverBackgroundOpacity": 0.8,
 "width": "100%",
 "paddingRight": 0,
 "shadow": false,
 "rollOverFontSize": 18,
 "height": 50,
 "fontSize": 18,
 "label": "BACK",
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "iconBeforeLabel": true,
 "rollOverIconURL": "skin/Button_1757CD7D_31FA_0015_4143_A9E37B16A50B_rollover.png",
 "click": "this.setComponentVisibility(this.Container_17569D7D_31FA_0015_41C4_CBC688763A8D, false, 0, null, null, false); this.setComponentVisibility(this.Container_0A898462_2D0B_4D94_41B3_BDB53B7688EE, true, 0, null, null, false)",
 "fontStyle": "italic",
 "class": "Button",
 "paddingBottom": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "iconWidth": 30,
 "minHeight": 1,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal",
 "propagateClick": true
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 0,
 "id": "Container_17579D7D_31FA_0015_41A1_D2B94269F28D",
 "scrollBarWidth": 10,
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical",
 "verticalAlign": "top",
 "width": "100%",
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "height": 1,
 "shadow": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "gap": 10,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0.5,
 "paddingTop": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "overflow": "scroll",
 "minHeight": 1,
 "layout": "absolute",
 "data": {
  "name": "line"
 },
 "propagateClick": true
},
{
 "paddingLeft": 0,
 "id": "Container_17578D7D_31FA_0015_41BE_353D3005648A",
 "scrollBarColor": "#000000",
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "verticalAlign": "top",
 "width": "100%",
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "shadow": false,
 "height": 8,
 "gap": 10,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "minHeight": 1,
 "layout": "absolute",
 "data": {
  "name": "line separator"
 },
 "propagateClick": true
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 10,
 "id": "Button_1757AD7D_31FA_0015_41C7_FB79F56FA149",
 "width": "100%",
 "data": {
  "name": "Button text 1"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "minWidth": 1,
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.8,
 "borderSize": 0,
 "layout": "horizontal",
 "iconHeight": 32,
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "paddingRight": 0,
 "shadow": false,
 "height": 36,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 15,
 "gap": 5,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "class": "Button",
 "paddingBottom": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "rollOverShadow": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "rollOverShadowBlurRadius": 18,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "iconWidth": 32,
 "minHeight": 1,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal",
 "propagateClick": true
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 10,
 "id": "Button_17565D7D_31FA_0015_4193_78BBCB2DC70F",
 "data": {
  "name": "Button text 2"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "minWidth": 1,
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.8,
 "borderSize": 0,
 "layout": "horizontal",
 "iconHeight": 32,
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "width": "100%",
 "paddingRight": 0,
 "shadow": false,
 "height": 36,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 23,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "class": "Button",
 "paddingBottom": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "iconWidth": 32,
 "minHeight": 1,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal",
 "propagateClick": true
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 10,
 "id": "Button_17564D7D_31FA_0015_41B8_A9191CD56C52",
 "data": {
  "name": "Button text 3"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "minWidth": 1,
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.8,
 "borderSize": 0,
 "layout": "horizontal",
 "iconHeight": 32,
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "pressedLabel": "Lorem Ipsum",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "width": "100%",
 "paddingRight": 0,
 "shadow": false,
 "height": 36,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "class": "Button",
 "paddingBottom": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "iconWidth": 32,
 "minHeight": 1,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal",
 "propagateClick": true
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 10,
 "id": "Button_17567D7D_31FA_0015_41C2_1E0D0AF05C7A",
 "data": {
  "name": "Button text 4"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "minWidth": 1,
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.8,
 "borderSize": 0,
 "layout": "horizontal",
 "iconHeight": 32,
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "width": "100%",
 "paddingRight": 0,
 "shadow": false,
 "height": 36,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "class": "Button",
 "paddingBottom": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "iconWidth": 32,
 "minHeight": 1,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal",
 "propagateClick": true
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 10,
 "id": "Button_17566D7D_31FA_0015_41AD_98D7C60C694F",
 "data": {
  "name": "Button text 5"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "minWidth": 1,
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.8,
 "borderSize": 0,
 "layout": "horizontal",
 "iconHeight": 32,
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "width": "100%",
 "paddingRight": 0,
 "shadow": false,
 "height": 36,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "class": "Button",
 "paddingBottom": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "iconWidth": 32,
 "minHeight": 1,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal",
 "propagateClick": true
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 10,
 "id": "Button_17561D7D_31FA_0015_41B5_BD72FAC26B8B",
 "data": {
  "name": "Button text 6"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "minWidth": 1,
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.8,
 "borderSize": 0,
 "layout": "horizontal",
 "iconHeight": 32,
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "width": "100%",
 "paddingRight": 0,
 "shadow": false,
 "height": 36,
 "fontSize": 18,
 "label": "Lorem ipsum",
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "class": "Button",
 "paddingBottom": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "iconWidth": 32,
 "minHeight": 1,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal",
 "propagateClick": true
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 10,
 "id": "Button_17560D7D_31FA_0015_41C4_7F0EC7540CC2",
 "data": {
  "name": "Button text 7"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "minWidth": 1,
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.8,
 "borderSize": 0,
 "layout": "horizontal",
 "iconHeight": 32,
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "width": "100%",
 "paddingRight": 0,
 "shadow": false,
 "height": 36,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "class": "Button",
 "paddingBottom": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "iconWidth": 32,
 "minHeight": 1,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal",
 "propagateClick": true
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 10,
 "id": "Button_17562D7D_31FA_0015_41A3_96B282B30DBA",
 "data": {
  "name": "Button text 8"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "minWidth": 1,
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.8,
 "borderSize": 0,
 "layout": "horizontal",
 "iconHeight": 32,
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "width": "100%",
 "paddingRight": 0,
 "shadow": false,
 "height": 36,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "class": "Button",
 "paddingBottom": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "iconWidth": 32,
 "minHeight": 1,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal",
 "propagateClick": true
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 10,
 "id": "Button_1756DD7D_31FA_0015_41A5_988B67FCF8B7",
 "data": {
  "name": "Button text 9"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "minWidth": 1,
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.8,
 "borderSize": 0,
 "layout": "horizontal",
 "iconHeight": 32,
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "width": "100%",
 "paddingRight": 0,
 "shadow": false,
 "height": 36,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "class": "Button",
 "paddingBottom": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "iconWidth": 32,
 "minHeight": 1,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal",
 "propagateClick": true
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 10,
 "id": "Button_1756FD7D_31FA_0015_41C7_DA2AAC2AAAEC",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "data": {
  "name": "Button text 10"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "minWidth": 1,
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.8,
 "borderSize": 0,
 "layout": "horizontal",
 "iconHeight": 32,
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "pressedBackgroundColorRatios": [
  0
 ],
 "iconBeforeLabel": true,
 "width": "100%",
 "paddingRight": 0,
 "shadow": false,
 "height": 36,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "class": "Button",
 "paddingBottom": 0,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "iconWidth": 32,
 "minHeight": 1,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal",
 "propagateClick": true
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 5,
 "id": "Button_175A5214_31FA_0014_4198_930DF49BADD9",
 "data": {
  "name": "Button <BACK"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "minWidth": 1,
 "fontColor": "#FFFFFF",
 "iconURL": "skin/Button_175A5214_31FA_0014_4198_930DF49BADD9.png",
 "borderSize": 0,
 "layout": "horizontal",
 "iconHeight": 30,
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "rollOverFontFamily": "Oswald",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "rollOverBackgroundOpacity": 0.8,
 "width": "100%",
 "paddingRight": 0,
 "shadow": false,
 "rollOverFontSize": 18,
 "height": 50,
 "fontSize": 18,
 "label": "BACK",
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "iconBeforeLabel": true,
 "rollOverIconURL": "skin/Button_175A5214_31FA_0014_4198_930DF49BADD9_rollover.png",
 "click": "this.setComponentVisibility(this.Container_1758A215_31FA_0014_41B6_9A4A5384548B, false, 0, null, null, false); this.setComponentVisibility(this.Container_0A898462_2D0B_4D94_41B3_BDB53B7688EE, true, 0, null, null, false)",
 "fontStyle": "italic",
 "class": "Button",
 "paddingBottom": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "iconWidth": 30,
 "minHeight": 1,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal",
 "propagateClick": true
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 0,
 "id": "Container_175A4215_31FA_0014_41B2_5B8676CC3F2F",
 "scrollBarWidth": 10,
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical",
 "verticalAlign": "top",
 "width": "100%",
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "height": 1,
 "shadow": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "gap": 10,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0.5,
 "paddingTop": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "overflow": "scroll",
 "minHeight": 1,
 "layout": "absolute",
 "data": {
  "name": "line"
 },
 "propagateClick": true
},
{
 "paddingLeft": 0,
 "id": "Container_1759B215_31FA_0014_41C0_84C99CBD5517",
 "scrollBarColor": "#000000",
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "verticalAlign": "top",
 "width": "100%",
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "shadow": false,
 "height": 8,
 "gap": 10,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "minHeight": 1,
 "layout": "absolute",
 "data": {
  "name": "line separator"
 },
 "propagateClick": true
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 10,
 "id": "Button_1759A215_31FA_0014_41C7_F6B1044E5BB3",
 "width": "100%",
 "data": {
  "name": "Button text 1"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "minWidth": 1,
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.8,
 "borderSize": 0,
 "layout": "horizontal",
 "iconHeight": 32,
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "paddingRight": 0,
 "shadow": false,
 "height": 36,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 15,
 "gap": 5,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "class": "Button",
 "paddingBottom": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "rollOverShadow": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "rollOverShadowBlurRadius": 18,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "iconWidth": 32,
 "minHeight": 1,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal",
 "propagateClick": true
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 10,
 "id": "Button_17598215_31FA_0014_41AC_1166AB319171",
 "data": {
  "name": "Button text 2"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "minWidth": 1,
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.8,
 "borderSize": 0,
 "layout": "horizontal",
 "iconHeight": 32,
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "width": "100%",
 "paddingRight": 0,
 "shadow": false,
 "height": 36,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 23,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "class": "Button",
 "paddingBottom": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "iconWidth": 32,
 "minHeight": 1,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal",
 "propagateClick": true
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 10,
 "id": "Button_1759F215_31FA_0014_41BD_BBFA5FB0D882",
 "data": {
  "name": "Button text 3"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "minWidth": 1,
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.8,
 "borderSize": 0,
 "layout": "horizontal",
 "iconHeight": 32,
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "pressedLabel": "Lorem Ipsum",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "width": "100%",
 "paddingRight": 0,
 "shadow": false,
 "height": 36,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "class": "Button",
 "paddingBottom": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "iconWidth": 32,
 "minHeight": 1,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal",
 "propagateClick": true
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 10,
 "id": "Button_1759D215_31FA_0014_41AD_B6C5744A0B97",
 "data": {
  "name": "Button text 4"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "minWidth": 1,
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.8,
 "borderSize": 0,
 "layout": "horizontal",
 "iconHeight": 32,
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "width": "100%",
 "paddingRight": 0,
 "shadow": false,
 "height": 36,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "class": "Button",
 "paddingBottom": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "iconWidth": 32,
 "minHeight": 1,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal",
 "propagateClick": true
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 10,
 "id": "Button_17593215_31FA_0014_41C0_42BAFB0080F0",
 "data": {
  "name": "Button text 5"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "minWidth": 1,
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.8,
 "borderSize": 0,
 "layout": "horizontal",
 "iconHeight": 32,
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "width": "100%",
 "paddingRight": 0,
 "shadow": false,
 "height": 36,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "class": "Button",
 "paddingBottom": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "iconWidth": 32,
 "minHeight": 1,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal",
 "propagateClick": true
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 10,
 "id": "Button_17592215_31FA_0014_41B2_AA3B5CC318B8",
 "data": {
  "name": "Button text 6"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "minWidth": 1,
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.8,
 "borderSize": 0,
 "layout": "horizontal",
 "iconHeight": 32,
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "width": "100%",
 "paddingRight": 0,
 "shadow": false,
 "height": 36,
 "fontSize": 18,
 "label": "Lorem ipsum",
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "class": "Button",
 "paddingBottom": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "iconWidth": 32,
 "minHeight": 1,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal",
 "propagateClick": true
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 10,
 "id": "Button_17590215_31FA_0014_41C1_2B2D012DCC76",
 "data": {
  "name": "Button text 7"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "minWidth": 1,
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.8,
 "borderSize": 0,
 "layout": "horizontal",
 "iconHeight": 32,
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "width": "100%",
 "paddingRight": 0,
 "shadow": false,
 "height": 36,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "class": "Button",
 "paddingBottom": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "iconWidth": 32,
 "minHeight": 1,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal",
 "propagateClick": true
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 10,
 "id": "Button_17597215_31FA_0014_41C0_9BEE1DE4D7F6",
 "data": {
  "name": "Button text 8"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "minWidth": 1,
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.8,
 "borderSize": 0,
 "layout": "horizontal",
 "iconHeight": 32,
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "width": "100%",
 "paddingRight": 0,
 "shadow": false,
 "height": 36,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "class": "Button",
 "paddingBottom": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "iconWidth": 32,
 "minHeight": 1,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal",
 "propagateClick": true
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 10,
 "id": "Button_17596215_31FA_0014_41C6_A42670770708",
 "data": {
  "name": "Button text 9"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "minWidth": 1,
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.8,
 "borderSize": 0,
 "layout": "horizontal",
 "iconHeight": 32,
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "width": "100%",
 "paddingRight": 0,
 "shadow": false,
 "height": 36,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "class": "Button",
 "paddingBottom": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "iconWidth": 32,
 "minHeight": 1,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal",
 "propagateClick": true
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 10,
 "id": "Button_1758B215_31FA_0014_41BC_C4EAC2A9544B",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "data": {
  "name": "Button text 10"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "minWidth": 1,
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.8,
 "borderSize": 0,
 "layout": "horizontal",
 "iconHeight": 32,
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "pressedBackgroundColorRatios": [
  0
 ],
 "iconBeforeLabel": true,
 "width": "100%",
 "paddingRight": 0,
 "shadow": false,
 "height": 36,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "class": "Button",
 "paddingBottom": 0,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "iconWidth": 32,
 "minHeight": 1,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal",
 "propagateClick": true
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 5,
 "id": "Button_17EA82B7_3106_0014_41C2_C9B0D9E6F22C",
 "data": {
  "name": "Button <BACK"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "minWidth": 1,
 "fontColor": "#FFFFFF",
 "iconURL": "skin/Button_17EA82B7_3106_0014_41C2_C9B0D9E6F22C.png",
 "borderSize": 0,
 "layout": "horizontal",
 "iconHeight": 30,
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "rollOverFontFamily": "Oswald",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "rollOverBackgroundOpacity": 0.8,
 "width": "100%",
 "paddingRight": 0,
 "shadow": false,
 "rollOverFontSize": 18,
 "height": 50,
 "fontSize": 18,
 "label": "BACK",
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "iconBeforeLabel": true,
 "rollOverIconURL": "skin/Button_17EA82B7_3106_0014_41C2_C9B0D9E6F22C_rollover.png",
 "click": "this.setComponentVisibility(this.Container_17EBA2B7_3106_0014_41A9_D6C96D0633AE, false, 0, null, null, false); this.setComponentVisibility(this.Container_0A898462_2D0B_4D94_41B3_BDB53B7688EE, true, 0, null, null, false)",
 "fontStyle": "italic",
 "class": "Button",
 "paddingBottom": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "iconWidth": 30,
 "minHeight": 1,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal",
 "propagateClick": true
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 0,
 "id": "Container_17EA92B7_3106_0014_41A6_2B88DF32BBA7",
 "scrollBarWidth": 10,
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical",
 "verticalAlign": "top",
 "width": "100%",
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "height": 1,
 "shadow": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "gap": 10,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0.5,
 "paddingTop": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "overflow": "scroll",
 "minHeight": 1,
 "layout": "absolute",
 "data": {
  "name": "line"
 },
 "propagateClick": true
},
{
 "paddingLeft": 0,
 "id": "Container_17EAA2B7_3106_0014_41B0_ACBB1485A79E",
 "scrollBarColor": "#000000",
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "verticalAlign": "top",
 "width": "100%",
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "shadow": false,
 "height": 8,
 "gap": 10,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "minHeight": 1,
 "layout": "absolute",
 "data": {
  "name": "line separator"
 },
 "propagateClick": true
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 10,
 "id": "Button_17EAB2B7_3106_0014_41A7_209417AD3E9A",
 "width": "100%",
 "data": {
  "name": "Button text 1"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "minWidth": 1,
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.8,
 "borderSize": 0,
 "layout": "horizontal",
 "iconHeight": 32,
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "paddingRight": 0,
 "shadow": false,
 "height": 36,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 15,
 "gap": 5,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "class": "Button",
 "paddingBottom": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "rollOverShadow": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "rollOverShadowBlurRadius": 18,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "iconWidth": 32,
 "minHeight": 1,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal",
 "propagateClick": true
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 10,
 "id": "Button_17EAD2B7_3106_0014_41C0_0B5453B4841D",
 "data": {
  "name": "Button text 2"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "minWidth": 1,
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.8,
 "borderSize": 0,
 "layout": "horizontal",
 "iconHeight": 32,
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "width": "100%",
 "paddingRight": 0,
 "shadow": false,
 "height": 36,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 23,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "class": "Button",
 "paddingBottom": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "iconWidth": 32,
 "minHeight": 1,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal",
 "propagateClick": true
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 10,
 "id": "Button_17EAE2B7_3106_0014_41C7_DB7FC43AAEE0",
 "data": {
  "name": "Button text 3"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "minWidth": 1,
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.8,
 "borderSize": 0,
 "layout": "horizontal",
 "iconHeight": 32,
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "pressedLabel": "Lorem Ipsum",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "width": "100%",
 "paddingRight": 0,
 "shadow": false,
 "height": 36,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "class": "Button",
 "paddingBottom": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "iconWidth": 32,
 "minHeight": 1,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal",
 "propagateClick": true
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 10,
 "id": "Button_17EB02B7_3106_0014_41AF_05D9AC36B189",
 "data": {
  "name": "Button text 4"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "minWidth": 1,
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.8,
 "borderSize": 0,
 "layout": "horizontal",
 "iconHeight": 32,
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "width": "100%",
 "paddingRight": 0,
 "shadow": false,
 "height": 36,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "class": "Button",
 "paddingBottom": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "iconWidth": 32,
 "minHeight": 1,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal",
 "propagateClick": true
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 10,
 "id": "Button_17EB32B7_3106_0014_41C8_467BF6AECBE8",
 "data": {
  "name": "Button text 5"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "minWidth": 1,
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.8,
 "borderSize": 0,
 "layout": "horizontal",
 "iconHeight": 32,
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "width": "100%",
 "paddingRight": 0,
 "shadow": false,
 "height": 36,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "class": "Button",
 "paddingBottom": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "iconWidth": 32,
 "minHeight": 1,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal",
 "propagateClick": true
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 10,
 "id": "Button_17EB42B7_3106_0014_41B0_CE70CBDDF438",
 "data": {
  "name": "Button text 6"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "minWidth": 1,
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.8,
 "borderSize": 0,
 "layout": "horizontal",
 "iconHeight": 32,
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "width": "100%",
 "paddingRight": 0,
 "shadow": false,
 "height": 36,
 "fontSize": 18,
 "label": "Lorem ipsum",
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "class": "Button",
 "paddingBottom": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "iconWidth": 32,
 "minHeight": 1,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal",
 "propagateClick": true
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 10,
 "id": "Button_17EB52B7_3106_0014_419C_439E593AEC43",
 "data": {
  "name": "Button text 7"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "minWidth": 1,
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.8,
 "borderSize": 0,
 "layout": "horizontal",
 "iconHeight": 32,
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "width": "100%",
 "paddingRight": 0,
 "shadow": false,
 "height": 36,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "class": "Button",
 "paddingBottom": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "iconWidth": 32,
 "minHeight": 1,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal",
 "propagateClick": true
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 10,
 "id": "Button_17EB62B7_3106_0014_41C5_43B38271B353",
 "data": {
  "name": "Button text 8"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "minWidth": 1,
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.8,
 "borderSize": 0,
 "layout": "horizontal",
 "iconHeight": 32,
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "width": "100%",
 "paddingRight": 0,
 "shadow": false,
 "height": 36,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "class": "Button",
 "paddingBottom": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "iconWidth": 32,
 "minHeight": 1,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal",
 "propagateClick": true
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 10,
 "id": "Button_17EB72B7_3106_0014_41B9_61857077BF4A",
 "data": {
  "name": "Button text 9"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "minWidth": 1,
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.8,
 "borderSize": 0,
 "layout": "horizontal",
 "iconHeight": 32,
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "width": "100%",
 "paddingRight": 0,
 "shadow": false,
 "height": 36,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "class": "Button",
 "paddingBottom": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "iconWidth": 32,
 "minHeight": 1,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal",
 "propagateClick": true
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 10,
 "id": "Button_17EB92B7_3106_0014_41B2_34A3E3F63779",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "data": {
  "name": "Button text 10"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "minWidth": 1,
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.8,
 "borderSize": 0,
 "layout": "horizontal",
 "iconHeight": 32,
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "pressedBackgroundColorRatios": [
  0
 ],
 "iconBeforeLabel": true,
 "width": "100%",
 "paddingRight": 0,
 "shadow": false,
 "height": 36,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "class": "Button",
 "paddingBottom": 0,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "iconWidth": 32,
 "minHeight": 1,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal",
 "propagateClick": true
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 5,
 "id": "Button_168CA310_3106_01EC_41C7_72CE0522951A",
 "data": {
  "name": "Button <BACK"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "minWidth": 1,
 "fontColor": "#FFFFFF",
 "iconURL": "skin/Button_168CA310_3106_01EC_41C7_72CE0522951A.png",
 "borderSize": 0,
 "layout": "horizontal",
 "iconHeight": 30,
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "rollOverFontFamily": "Oswald",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "rollOverBackgroundOpacity": 0.8,
 "width": "100%",
 "paddingRight": 0,
 "shadow": false,
 "rollOverFontSize": 18,
 "height": 50,
 "fontSize": 18,
 "label": "BACK",
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "iconBeforeLabel": true,
 "rollOverIconURL": "skin/Button_168CA310_3106_01EC_41C7_72CE0522951A_rollover.png",
 "click": "this.setComponentVisibility(this.Container_168D8311_3106_01EC_41B0_F2D40886AB88, false, 0, null, null, false); this.setComponentVisibility(this.Container_0A898462_2D0B_4D94_41B3_BDB53B7688EE, true, 0, null, null, false)",
 "fontStyle": "italic",
 "class": "Button",
 "paddingBottom": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "iconWidth": 30,
 "minHeight": 1,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal",
 "propagateClick": true
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 0,
 "id": "Container_168C8310_3106_01EC_4187_B16F315A4A23",
 "scrollBarWidth": 10,
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical",
 "verticalAlign": "top",
 "width": "100%",
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "height": 1,
 "shadow": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "gap": 10,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0.5,
 "paddingTop": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "overflow": "scroll",
 "minHeight": 1,
 "layout": "absolute",
 "data": {
  "name": "line"
 },
 "propagateClick": true
},
{
 "paddingLeft": 0,
 "id": "Container_168D7310_3106_01EC_41BE_5FCBD9E27BE4",
 "scrollBarColor": "#000000",
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "verticalAlign": "top",
 "width": "100%",
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "shadow": false,
 "height": 8,
 "gap": 10,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "minHeight": 1,
 "layout": "absolute",
 "data": {
  "name": "line separator"
 },
 "propagateClick": true
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 10,
 "id": "Button_168D6310_3106_01EC_41B8_A0B6BE627547",
 "width": "100%",
 "data": {
  "name": "Button text 1"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "minWidth": 1,
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.8,
 "borderSize": 0,
 "layout": "horizontal",
 "iconHeight": 32,
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "paddingRight": 0,
 "shadow": false,
 "height": 36,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 15,
 "gap": 5,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "class": "Button",
 "paddingBottom": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "rollOverShadow": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "rollOverShadowBlurRadius": 18,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "iconWidth": 32,
 "minHeight": 1,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal",
 "propagateClick": true
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 10,
 "id": "Button_168D5310_3106_01EC_41B5_96D9387401B8",
 "data": {
  "name": "Button text 2"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "minWidth": 1,
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.8,
 "borderSize": 0,
 "layout": "horizontal",
 "iconHeight": 32,
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "width": "100%",
 "paddingRight": 0,
 "shadow": false,
 "height": 36,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 23,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "class": "Button",
 "paddingBottom": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "iconWidth": 32,
 "minHeight": 1,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal",
 "propagateClick": true
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 10,
 "id": "Button_168D3310_3106_01EC_41AC_5D524E4677A5",
 "data": {
  "name": "Button text 3"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "minWidth": 1,
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.8,
 "borderSize": 0,
 "layout": "horizontal",
 "iconHeight": 32,
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "pressedLabel": "Lorem Ipsum",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "width": "100%",
 "paddingRight": 0,
 "shadow": false,
 "height": 36,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "class": "Button",
 "paddingBottom": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "iconWidth": 32,
 "minHeight": 1,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal",
 "propagateClick": true
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 10,
 "id": "Button_168D2310_3106_01EC_41B8_9D7D1B2B55FA",
 "data": {
  "name": "Button text 4"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "minWidth": 1,
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.8,
 "borderSize": 0,
 "layout": "horizontal",
 "iconHeight": 32,
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "width": "100%",
 "paddingRight": 0,
 "shadow": false,
 "height": 36,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "class": "Button",
 "paddingBottom": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "iconWidth": 32,
 "minHeight": 1,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal",
 "propagateClick": true
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 10,
 "id": "Button_168D0310_3106_01EC_41A1_FA8FC42E6FF3",
 "data": {
  "name": "Button text 5"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "minWidth": 1,
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.8,
 "borderSize": 0,
 "layout": "horizontal",
 "iconHeight": 32,
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "width": "100%",
 "paddingRight": 0,
 "shadow": false,
 "height": 36,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "class": "Button",
 "paddingBottom": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "iconWidth": 32,
 "minHeight": 1,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal",
 "propagateClick": true
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 10,
 "id": "Button_168DE310_3106_01EC_4192_6A9F468A0ADE",
 "data": {
  "name": "Button text 6"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "minWidth": 1,
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.8,
 "borderSize": 0,
 "layout": "horizontal",
 "iconHeight": 32,
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "width": "100%",
 "paddingRight": 0,
 "shadow": false,
 "height": 36,
 "fontSize": 18,
 "label": "Lorem ipsum",
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "class": "Button",
 "paddingBottom": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "iconWidth": 32,
 "minHeight": 1,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal",
 "propagateClick": true
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 10,
 "id": "Button_168DD310_3106_01EC_4190_7815FA70349E",
 "data": {
  "name": "Button text 7"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "minWidth": 1,
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.8,
 "borderSize": 0,
 "layout": "horizontal",
 "iconHeight": 32,
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "width": "100%",
 "paddingRight": 0,
 "shadow": false,
 "height": 36,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "class": "Button",
 "paddingBottom": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "iconWidth": 32,
 "minHeight": 1,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal",
 "propagateClick": true
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 10,
 "id": "Button_168DB310_3106_01EC_41B2_3511AA5E40E1",
 "data": {
  "name": "Button text 8"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "minWidth": 1,
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.8,
 "borderSize": 0,
 "layout": "horizontal",
 "iconHeight": 32,
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "width": "100%",
 "paddingRight": 0,
 "shadow": false,
 "height": 36,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "class": "Button",
 "paddingBottom": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "iconWidth": 32,
 "minHeight": 1,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal",
 "propagateClick": true
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 10,
 "id": "Button_168DA310_3106_01EC_41BE_DF88732C2A28",
 "data": {
  "name": "Button text 9"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "minWidth": 1,
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.8,
 "borderSize": 0,
 "layout": "horizontal",
 "iconHeight": 32,
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "width": "100%",
 "paddingRight": 0,
 "shadow": false,
 "height": 36,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "class": "Button",
 "paddingBottom": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "iconWidth": 32,
 "minHeight": 1,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal",
 "propagateClick": true
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 10,
 "id": "Button_168D9311_3106_01EC_41A8_3BD8769525D6",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "data": {
  "name": "Button text 10"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "minWidth": 1,
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.8,
 "borderSize": 0,
 "layout": "horizontal",
 "iconHeight": 32,
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "pressedBackgroundColorRatios": [
  0
 ],
 "iconBeforeLabel": true,
 "width": "100%",
 "paddingRight": 0,
 "shadow": false,
 "height": 36,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "class": "Button",
 "paddingBottom": 0,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "iconWidth": 32,
 "minHeight": 1,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal",
 "propagateClick": true
},
{
 "paddingLeft": 0,
 "id": "Image_1E18723C_57F1_802D_41C5_8325536874A5",
 "minWidth": 1,
 "width": "25%",
 "borderSize": 0,
 "url": "skin/Image_1E18723C_57F1_802D_41C5_8325536874A5.jpg",
 "verticalAlign": "top",
 "paddingRight": 0,
 "shadow": false,
 "height": "100%",
 "maxWidth": 200,
 "class": "Image",
 "paddingBottom": 0,
 "maxHeight": 200,
 "backgroundOpacity": 0,
 "scaleMode": "fit_inside",
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "minHeight": 1,
 "data": {
  "name": "agent photo"
 },
 "propagateClick": false
},
{
 "paddingLeft": 10,
 "id": "HTMLText_1E18423C_57F1_802D_41C4_458DB7F892AC",
 "scrollBarColor": "#04A3E1",
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "width": "75%",
 "paddingRight": 10,
 "scrollBarMargin": 2,
 "shadow": false,
 "height": "100%",
 "class": "HTMLText",
 "paddingBottom": 10,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:2.58vh;font-family:'Oswald';\"><B><I>JOHN DOE</I></B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:2.29vh;font-family:'Oswald';\"><I>Licensed Real Estate Salesperson</I></SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.86vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.86vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#999999;font-size:1.86vh;font-family:'Oswald';\"><I>Tlf.: +11 111 111 111</I></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#999999;font-size:1.86vh;font-family:'Oswald';\"><I>jhondoe@realestate.com</I></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#999999;font-size:1.86vh;font-family:'Oswald';\"><I>www.loremipsum.com</I></SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:0.86vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.86vh;font-family:Arial, Helvetica, sans-serif;\"/></p><p STYLE=\"margin:0; line-height:0.86vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.86vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.86vh;font-family:Arial, Helvetica, sans-serif;\">Mauris aliquet neque quis libero consequat vestibulum. Donec lacinia consequat dolor viverra sagittis. Praesent consequat porttitor risus, eu condimentum nunc. Proin et velit ac sapien luctus efficitur egestas ac augue. Nunc dictum, augue eget eleifend interdum, quam libero imperdiet lectus, vel scelerisque turpis lectus vel ligula. Duis a porta sem. Maecenas sollicitudin nunc id risus fringilla, a pharetra orci iaculis. Aliquam turpis ligula, tincidunt sit amet consequat ac, imperdiet non dolor.</SPAN></DIV></div>",
 "paddingTop": 0,
 "scrollBarWidth": 10,
 "minHeight": 1,
 "data": {
  "name": "HTMLText19460"
 },
 "propagateClick": false
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 10,
 "id": "Button_D0DC1273_DFE4_1F83_41D3_3D5446768FEA",
 "left": "0%",
 "data": {
  "name": "Button Contact"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "minWidth": 1,
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.8,
 "borderSize": 0,
 "layout": "horizontal",
 "iconHeight": 32,
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "width": "100%",
 "paddingRight": 0,
 "bottom": "-4900%",
 "shadow": false,
 "height": 50,
 "fontSize": "16px",
 "label": "TELEFONE",
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "click": "this.setComponentVisibility(this.Container_0A898462_2D0B_4D94_41B3_BDB53B7688EE, false, 0, null, null, false); this.setComponentVisibility(this.Container_168D8311_3106_01EC_41B0_F2D40886AB88, true, 0, null, null, false)",
 "fontStyle": "italic",
 "class": "Button",
 "paddingBottom": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "iconWidth": 32,
 "minHeight": 1,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal",
 "propagateClick": true
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 10,
 "id": "Button_D0F7B98B_DFE4_2C83_41E4_317D490638D3",
 "left": "0%",
 "data": {
  "name": "Button Contact"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "minWidth": 1,
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.8,
 "borderSize": 0,
 "layout": "horizontal",
 "iconHeight": 32,
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "width": "100%",
 "paddingRight": 0,
 "bottom": "-4900%",
 "shadow": false,
 "height": 50,
 "fontSize": "16px",
 "label": "TELEFONE",
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "click": "this.setComponentVisibility(this.Container_0A898462_2D0B_4D94_41B3_BDB53B7688EE, false, 0, null, null, false); this.setComponentVisibility(this.Container_168D8311_3106_01EC_41B0_F2D40886AB88, true, 0, null, null, false)",
 "fontStyle": "italic",
 "class": "Button",
 "paddingBottom": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "horizontalAlign": "left",
 "paddingTop": 0,
 "iconWidth": 32,
 "minHeight": 1,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal",
 "propagateClick": true
}],
 "data": {
  "name": "Player468"
 },
 "propagateClick": true
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

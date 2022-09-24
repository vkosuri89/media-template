/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { useEffect, useMemo, useState } from "react";
import * as liveShareHooks from "../live-share-hooks";
import {
  LiveNotifications,
  LiveSharePage,
  MediaPlayerContainer,
  PageError,
} from "../components";
import { AzureMediaPlayer } from "../utils/AzureMediaPlayer";
import { ACCEPT_PLAYBACK_CHANGES_FROM } from "../constants/allowed-roles";
import { useTeamsContext } from "../teams-js-hooks/useTeamsContext";
import SpotifyPlayer from 'react-spotify-web-playback';

const MeetingStage = () => {
  // Teams context
  const context = useTeamsContext();
  // Media player
  const [player, setPlayer] = useState();

  // Fluid objects hook which uses TeamsFluidClient to create container
  const {
    presence, // EphemeralPresence Fluid object
    mediaSession, // EphemeralMediaSession Fluid object
    notificationEvent, // EphemeralEvent Fluid object
    takeControlMap, // SharedMap Fluid object for presenter control
    playlistMap, // SharedMap Fluid object for playlist
    inkEvent, // EphemeralEvent Fluid object
    container, // Fluid container
    error, // Join container error
  } = liveShareHooks.useSharedObjects();

  // Notification hook
  const {
    notificationStarted, // boolean that is true once notificationEvent.initialize() is called
    notificationToDisplay, // most recent notification that was sent through notificationEvent
    sendNotification, // callback method to send a notification through notificationEvent
  } = liveShareHooks.useNotifications(notificationEvent, context);

  // Presence hook
  const {
    presenceStarted, // boolean that is true once presence.initialize() is called
    localUser, // local user presence object
    localUserIsEligiblePresenter, // boolean that is true if local user is eligible to take control
    users, // user presence array
  } = liveShareHooks.usePresence(
    presence,
    ACCEPT_PLAYBACK_CHANGES_FROM,
    context
  );

  // Take control map
  const {
    takeControlStarted, // boolean that is true once takeControlMap.on() listener is registered
    localUserIsPresenting, // boolean that is true if local user is currently presenting
    takeControl, // callback method to take control of playback
  } = liveShareHooks.useTakeControl(
    takeControlMap,
    localUser?.data?.teamsUserId,
    localUserIsEligiblePresenter,
    users,
    sendNotification
  );

  // Playlist map
  const {
    playlistStarted, // boolean that is true once playlistMap listener is registered
    selectedMediaItem, // selected media item object, or undefined if unknown
    nextTrack, // callback method to skip to the next track
  } = liveShareHooks.usePlaylist(playlistMap, sendNotification);

  // Media session hook
  const {
    mediaSessionStarted, // boolean that is true once mediaSession.initialize() is called
    suspended, // boolean that is true if synchronizer is suspended
    play, // callback method to synchronize a play action
    pause, // callback method to synchronize a pause action
    seekTo, // callback method to synchronize a seekTo action
    endSuspension, // callback method to end the synchronizer suspension
  } = liveShareHooks.useMediaSession(
    mediaSession,
    selectedMediaItem,
    player,
    localUserIsPresenting,
    ACCEPT_PLAYBACK_CHANGES_FROM,
    sendNotification
  );

  // Ink hook
  const { inkStarted, strokesToDisplay, sendStrokes } = liveShareHooks.useInk(
    inkEvent,
    ACCEPT_PLAYBACK_CHANGES_FROM
  );

  // Set up the media player
  useEffect(() => {
    if (!player && selectedMediaItem) {
      // Setup Azure Media Player
      const src = [{ src: selectedMediaItem.src }];
      const amp = new AzureMediaPlayer("video", src);
      // Set player when AzureMediaPlayer is ready to go
      const onReady = () => {
        setPlayer(amp);
        amp.removeEventListener("ready", onReady);
      };
      amp.addEventListener("ready", onReady);
    }
  }, [selectedMediaItem, player, setPlayer]);

  const started = useMemo(() => {
    return [
      notificationStarted,
      mediaSessionStarted,
      presenceStarted,
      takeControlStarted,
      playlistStarted,
      inkStarted,
    ].every((value) => value === true);
  }, [
    notificationStarted,
    mediaSessionStarted,
    presenceStarted,
    takeControlStarted,
    playlistStarted,
    inkStarted,
  ]);

  var authToken = "BQCj71Gq45DSx3vbOuTE2j-XAwI5afXAhtXmxSJ8LWm42B9-NryWdP6w4NGBWxPCEafWSkuY-U9cXbTXZ5jAWazXpXqXILZ0nY63t4fBbqu73T53G33K3vVI4_hw0r_DxcnPijqIa9tKAqqQ1jrNW6ZcT2V3cMe7J-rsMitt-aFLJYzZs2r5OrOsDkZHzk7f49EvISuSqWjHIaRzYu2hk8UrQlZHpd0wQQtmMUHnQnhYhrngHQ"
  var trackID = "47v4uUtj5AukJmCbMq4Kry"

  console.log("hello")
  console.log(selectedMediaItem);
  console.log(playlistMap.get("selected-media-id"))

  // Render the media player
  return (
    <div style={{ backgroundColor: "black" }}>
      <SpotifyPlayer
        token={authToken}
        uri={[`spotify:track:${trackID}`]}
      />
    </div>
  );
};

export default MeetingStage;

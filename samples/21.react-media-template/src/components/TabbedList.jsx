/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { mergeClasses, TabList, Tab } from "@fluentui/react-components";
import { getFlexItemStyles, getFlexRowStyles } from "../styles/layouts";
import { MediaCard } from "./MediaCard";
import { useMemo, useState } from "react";
import SpotifyWebApi from 'spotify-web-api-js'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Form';
import './TabbedList.css'


export const TabbedList = ({
  mediaItems,
  browseItems,
  sharingActive,
  nowPlayingId,
  addMediaItem,
  removeMediaItem,
  selectMedia,
  params,
}) => {
  const [selectedValue, setSelectedValue] = useState("tab1");

  const onTabSelect = (event, data) => {
    setSelectedValue(data.value);
  };

  const [token, setToken] = useState();

  const filteredBrowseItems = useMemo(() => {
    return browseItems.filter(
      (browseItem) =>
        !mediaItems.find((mediaItem) => browseItem.id === mediaItem.id)
    );
  }, [browseItems, mediaItems]);

  const [searchResults, setSearchResults] = useState([]);

  const flexRowStyles = getFlexRowStyles();
  const flexItemStyles = getFlexItemStyles();

  var spotifyApi = new SpotifyWebApi()

  spotifyApi.setAccessToken("BQA4PrWSc6bTtn7hodXxHG4L1TG7bXJLfnNqbaUgb908FhABGEpFJnsMUFXpJCupwf7biN8dXRBWpS9BIXlX1mT_QRRYF3EnB1ZLGyL0-BJJYwfsHbxMRd1QOBM3xibjZjo0_3DAaJhEt8KO-pEe-8cR6oJZDHDks4HzA0LIw7viuGrwrQFxvxU4463ff1saZVkBvDaKmO2h2nLVUmb4vehqaLom3VBqjq-TlcOo_zh1Yw");
  
  

  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    spotifyApi.searchTracks(searchQuery).then(tracks => {
      console.log(searchResults);
      var tempsearchresults = [];
      for(let i = 0; i<10; i++){
        tempsearchresults.push({
          id: 100 + i,
          songId: tracks.tracks.items[i].id,
          thumbnailImage: tracks.tracks.items[i].album.images[0].url,
          title: tracks.tracks.items[i].name,
        })
        //console.log(tempsearchresults);
      }
      setSearchResults(tempsearchresults);
    })
  }

  const client_id = 'ac7a66c8e1574b08bb77cdc724e9eeca';
  const redirect_uri = 'http://localhost:3000/sidepanel/';
  const scope = 'user-read-playback-state user-modify-playback-state app-remote-control user-read-private user-read-email streaming';
  let spotifyAuthUrl = 'https://accounts.spotify.com/authorize';
  spotifyAuthUrl += '?response_type=token';
  spotifyAuthUrl += '&client_id=' + encodeURIComponent(client_id);
  spotifyAuthUrl += '&scope=' + encodeURIComponent(scope);
  spotifyAuthUrl += '&redirect_uri=' + encodeURIComponent(redirect_uri);

  
  return (
    <>
      <div>
        <div
        style={{ width: "100%" }}
        className={mergeClasses(
          flexRowStyles.root,
          flexRowStyles.vAlignCenter,
          flexItemStyles.noShrink
        )}
      >
        <TabList selectedValue={selectedValue} onTabSelect={onTabSelect}>
          <Tab value="tab1">Playlist</Tab>
          <Tab value="tab2">Browse</Tab>
        </TabList>
      </div>
      {selectedValue === "tab1" &&
        mediaItems.map((mediaItem) => (
          <MediaCard
            key={`media-item-${mediaItem.id}`}
            mediaItem={mediaItem}
            nowPlayingId={nowPlayingId}
            sharingActive={sharingActive}
            buttonText="Watch together"
            selectMedia={selectMedia}
            removeMediaItem={removeMediaItem}
          />
        ))}
      {selectedValue === "tab2" && (
        <div>
        <form className="search" onSubmit={(e) => {handleSubmit(e)}}>
            <input type = "text" className="searchBar" style={{margin: "20px"}} value = {searchQuery} placeholder="Song Name" required onChange={(e)=> {handleSearchChange(e)}}/>
            <input type = "submit" className = "searchButton" value = "Search"/>
        </form>
        
        {searchResults.map((mediaItem) => (
            <MediaCard
              key={`browse-item-${mediaItem.id}`}
              mediaItem={mediaItem}
              nowPlayingId={null}
              sharingActive={sharingActive}
              buttonText="Add to playlist"
              selectMedia={(item) => {
                addMediaItem(item);
                setSelectedValue("tab1");
              }}
            />
        ))}
        </div>
        )}
        </div>
    </>
  );
};

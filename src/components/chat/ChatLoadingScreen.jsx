import React from 'react'
import PulseLoader from "react-spinners/PulseLoader";

function ChatLoadingScreen({messageLoading}) {

  return (
    <div class={`${!messageLoading ? "hidden" : "" } absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}>
        <PulseLoader color="#26cfe9" />
    </div>
  )
}

export default ChatLoadingScreen
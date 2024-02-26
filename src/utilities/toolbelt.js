function formatReleaseDate (date) {
    // convert a string that looks like:
    // 2023-11-22 and makes it look like
    // November 22, 2023
    const dateObject = new Date(date);
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    return dateObject.toLocaleDateString("en-US", options);
}

function filterVideos(videoDataArray) {
    // site: "YouTube"
    // type: "Trailer"
    return videoDataArray.filter((videoData) => {
        return videoData.site === "YouTube" && videoData.type === "Trailer";
    });
}

function convertRuntime (runtime) {
    const hours = Math.floor( runtime / 60 );
    const minutes = runtime % 60;
    if ( hours > 0 ) {
        return `${hours}h${minutes}m`;
    } else {
        return `${minutes}m`;
    }
}

export { formatReleaseDate, filterVideos, convertRuntime };
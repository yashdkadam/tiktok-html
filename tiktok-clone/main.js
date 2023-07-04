var hls_urls = [
  "https://v.redd.it/0o68nqu420a81/HLSPlaylist.m3u8?a=1644051308%2CMGM3NzViZmE1MzQzMmNjMmIxMDFjM2M5ZWIyNTlkNDg5MDEzMTI4MzZjMjQwZDNkMjllZjQxZjhiZjY4NGUwMw%3D%3D&amp;v=1&amp;f=sd",
];
var currentlyPlaying = null;
var j = 0;

function vidFullscreen() {
  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.mozRequestFullScreen) {
    video.mozRequestFullScreen();
  } else if (video.webkitRequestFullscreen) {
    video.webkitRequestFullscreen();
  }
}

var subreddit = "";
$.get(
  "https://corsproxy.io/?https://www.reddit.com/r/random.json",
  function (data, status) {
    subreddit += data["data"]["children"][0]["data"]["subreddit"];
    var sectionInt = Math.floor(Math.random() * 5);
    sections = ["top", "", "new", "hot", "rising"];
    console.log(subreddit, sections[sectionInt]);

    const api_url = `https://www.reddit.com/r/${subreddit}/${sections[sectionInt]}.json`;

    async function getapi(url) {
      const response = await fetch(url).then((d) => d.json());
      for (let i = 0; i < response["data"]["children"].length; i++) {
        try {
          console.log(
            response["data"]["children"][i]["data"]["media"]["reddit_video"][
              "hls_url"
            ],
            "hls url"
          );
          hls_urls.push(
            response["data"]["children"][i]["data"]["media"]["reddit_video"][
              "hls_url"
            ]
          );
          console.log(
            response["data"]["children"][i]["data"]["permalink"],
            "permalink"
          );
        } catch (error) {
          const e = new ErrorEvent("error", {
            message: "my error",
            error: error,
          });
          window.dispatchEvent(e);
        }
        console.log(i);
      }
      insert();
    }
    getapi(api_url);

    var script = ``;
    function insert() {
      var html = ``;
      for (let i in hls_urls) {
        html += `<div class="video">
          <video loop autoplay id="player${j}" class="video-js vjs-default-skin video__player" preload="none" crossorigin="true" controls
          width="640" height="268" controls></video>
      
        <!-- sidebar -->
        <div class="videoSidebar">
          <div class="videoSidebar__button">
            <span class="material-icons"> favorite_border </span>
            <p>12</p>
          </div>
      
          <div class="videoSidebar__button">
            <span class="material-icons"> message </span>
            <p>23</p>
          </div>
      
          <div class="videoSidebar__button">
            <span class="material-icons"> share </span>
            <p>75</p>
          </div>
        </div>
      
        <!-- footer -->
        <div class="videoFooter">
          <div class="videoFooter__text">
            <h3>Somanath Goudar</h3>
            <p class="videoFooter__description">Best Video Ever</p>
      
            <div class="videoFooter__ticker">
              <span class="material-icons videoFooter__icon"> music_note </span>
              <marquee>Song name</marquee>
            </div>
          </div>
          <img src="https://static.thenounproject.com/png/934821-200.png" alt="" class="videoFooter__record" />
        </div>
      </div>`;
        script += `loadPlayer('${hls_urls[i]}', 'player${j}');`;
        j++;
      }
      $(".app__videos").append(html);
      temp();
    }
    function temp() {
      $(document).ready(() => {
        console.log("executed");
        setTimeout(() => {
          eval(script);
        }, 200);
      });
    }

    setInterval(() => {
      var videos = document.querySelectorAll("video");

      // Pause all videos except the one in the viewport
      function pauseNonViewportVideos() {
        videos.forEach(function (video) {
          if (video !== currentlyPlaying && !video.paused) {
            video.pause();
          }
        });
      }

      // Play video when it enters the viewport
      function playVideoOnIntersection(entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            if (entry.target !== currentlyPlaying) {
              if (currentlyPlaying !== null) {
                currentlyPlaying.pause();
              }
              currentlyPlaying = entry.target;
              if (currentlyPlaying.paused) {
                currentlyPlaying.play().catch(function (error) {
                  console.log("Failed to play video:", error);
                });
              }
            }
          } else {
            entry.target.pause();
          }
        });
      }

      // Create the Intersection Observer
      var observer = new IntersectionObserver(playVideoOnIntersection, {
        threshold: 0.5, // Adjust the threshold as needed
      });

      // Observe each video
      videos.forEach(function (video) {
        observer.observe(video);
        video.addEventListener("play", pauseNonViewportVideos);
      });

      // Add event listener for scroll event
      window.addEventListener("scroll", function () {
        // Trigger necessary actions based on scroll
        pauseNonViewportVideos(); // Pause videos not in the viewport
        observer.disconnect(); // Disconnect the Intersection Observer
        observer.observe(currentlyPlaying); // Observe the currently playing video
      });
    }, 500);
  }
);

setInterval(() => {
  $(document).ready(function () {
    hls_urls = [];
    // Button click event handler
    console.log(
      $(".app__videos").children().last().children().attr("id") ===
        $(currentlyPlaying).attr("id")
    );
    console.log(currentlyPlaying);
    if (
      $(".app__videos").children().last().children().attr("id") ===
      $(currentlyPlaying).attr("id")
    ) {
      // $("#kjklk").click(() => {
      // Perform AJAX request
      $.ajax({
        url: "https://corsproxy.io/?https://www.reddit.com/r/random.json", // Replace with the actual URL to retrieve the data
        method: "GET",
        dataType: "json",
        success: function (data) {
          var subreddit = data["data"]["children"][0]["data"]["subreddit"];
          var sectionInt = Math.floor(Math.random() * 5);
          sections = ["top", "", "new", "hot", "rising"];
          console.log(subreddit, sections[sectionInt]);

          const api_url = `https://www.reddit.com/r/${subreddit}/${sections[sectionInt]}.json`;
          async function getapi(url) {
            const response = await fetch(url).then((d) => d.json());
            for (let i = 0; i < response["data"]["children"].length; i++) {
              try {
                console.log(
                  response["data"]["children"][i]["data"]["media"][
                    "reddit_video"
                  ]["hls_url"],
                  "hls url"
                );
                hls_urls.push(
                  response["data"]["children"][i]["data"]["media"][
                    "reddit_video"
                  ]["hls_url"]
                );
                console.log(
                  response["data"]["children"][i]["data"]["permalink"],
                  "permalink"
                );
              } catch (error) {
                const e = new ErrorEvent("error", {
                  message: "my error",
                  error: error,
                });
                window.dispatchEvent(e);
              }
              console.log(i);
            }
            insert();
          }
          getapi(api_url);

          var script = ``;
          function insert() {
            var html = ``;
            for (let i in hls_urls) {
              html += `<div class="video">
          <video loop autoplay id="player${j}" class="video-js vjs-default-skin video__player" preload="none" crossorigin="true" controls
          width="640" height="268" controls></video>
      
        <!-- sidebar -->
        <div class="videoSidebar">
          <div class="videoSidebar__button">
            <span class="material-icons"> favorite_border </span>
            <p>12</p>
          </div>
      
          <div class="videoSidebar__button">
            <span class="material-icons"> message </span>
            <p>23</p>
          </div>
      
          <div class="videoSidebar__button">
            <span class="material-icons"> share </span>
            <p>75</p>
          </div>
        </div>
      
        <!-- footer -->
        <div class="videoFooter">
          <div class="videoFooter__text">
            <h3>Somanath Goudar</h3>
            <p class="videoFooter__description">Best Video Ever</p>
      
            <div class="videoFooter__ticker">
              <span class="material-icons videoFooter__icon"> music_note </span>
              <marquee>Song name</marquee>
            </div>
          </div>
          <img src="https://static.thenounproject.com/png/934821-200.png" alt="" class="videoFooter__record" />
        </div>
      </div>`;
              script += `loadPlayer('${hls_urls[i]}', 'player${j}');`;
              j++;
            }
            $(".app__videos").append(html);
            temp();
          }
          function temp() {
            $(document).ready(() => {
              console.log("executed");
              eval(script);
            });
          }
        },
        error: function (xhr, status, error) {
          console.log("AJAX Error:", error);
        },
      });
    }
  });
}, 500);

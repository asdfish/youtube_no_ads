(function() {
  let urlInput = document.querySelector("input[type=text]"),
    form = document.querySelector("form")

  form.addEventListener("submit", function(event) {
    event.preventDefault()

    if(urlInput.value) {
      //add http/https
      if(!urlInput.value.match("http://") && !urlInput.value.match("https://")) urlInput.value = "https://" + urlInput.value
      if(urlInput.value.match("http://")) urlInput.value = urlInput.value.replace("http://", "https://")

      try {
        let url = new URL(urlInput.value),
          iframeURL = urlInput.value

        if(url.hostname.match("youtube.com") || url.hostname.match("youtu.be")) {
          let videoId
          if(url.hostname.match("youtube.com")) {
            videoId = new URLSearchParams(url.searchParams).get("v")
          } else if(url.hostname.match("youtu.be")) {
            videoId = url.pathname.replace("/", "")
          }
          iframeURL = "https://www.youtube-nocookie.com/embed/" + videoId
        }

        if(iframeURL) {
          let iframe = document.querySelector("iframe")
          if(!iframe) {
            iframe = document.createElement("iframe")
            iframe.style.width = "100vw"
            iframe.style.height = "100vh"
            document.body.appendChild(iframe)
          }
          iframe.src = iframeURL
          iframe.scrollIntoView()
        }
      } catch {}
    }
    urlInput.value = ""
  })
})()

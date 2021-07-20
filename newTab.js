$(function () {
  $.get(
    "https://api.unsplash.com/photos/random?query=galaxy&client_id=BpYTgTTHZheS7oKJoLOK1qi8hBAvqlet1fpRUz6e6gY",
    function (data) {
      $("body").css("background-image", "url(" + data.urls.full + ")");
      $("#pc").html(
        "Photo by <a href='" +
          data.user.links.html +
          "'>" +
          data.user.name +
          "</a> on <a href='https://unsplash.com/'>Unsplash</a>"
      );
      $("#pc").html(
        "Photo by <a href='" +
          data.user.links.html +
          "'>" +
          data.user.name +
          "</a> on <a href='https://unsplash.com/'>Unsplash</a>"
      );
    }
    //star
  );

  window.setInterval(function () {
    startTime();
  }, 1000);

  startTime();

  function startTime() {
    let weekday = new Array(7);
    weekday[0] = "Sun";
    weekday[1] = "Mon";
    weekday[2] = "Tue";
    weekday[3] = "Wed";
    weekday[4] = "Thu";
    weekday[5] = "Fri";
    weekday[6] = "Sat";
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let date = today.getDate();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    let day = today.getDay();
    h = checkTime(h);
    m = checkTime(m);
    s = checkTime(s);
    month = checkTime(month);
    date = checkTime(date);
    $("#time").text(h + ":" + m + ":" + s);
    $("#date").text(year + "-" + month + "-" + date + "  " + weekday[day]);
  }

  function greeting() {
    let today = new Date();
    let hour = today.getHours();
    if (hour >= 0 && hour < 6) {
      $("#theWord").text("Good night!");
    } else if (hour >= 6 && hour < 12) {
      $("#theWord").text("Good morning!");
    } else if (hour >= 12 && hour < 18) {
      $("#theWord").text("Good afternoon!");
    } else if (hour >= 18 && hour < 24) {
      $("#theWord").text("Good evening!");
    }
    console.log(hour);
  }
  greeting();

  function checkTime(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  $("#searchBtn").click(function () {
    let searchUrl = "https://www.google.com/search?q=" + $("#search").val();
    let createData = {
      url: searchUrl,
    };
    chrome.tabs.create(createData, function () {});
    close();
  });

  $("#search").keypress(function (e) {
    let key = e.which;
    if (key == 13) {
      // the enter key code
      $("#searchBtn").click();
    }
  });

  function WrittenNotes() {
    this.click(function () {
      $("#detail").show();
    });
  }

  $("#save").click(function () {
    const title = $("#title").text();
    const post = $("#post-body").text();
    const obj = {};
    obj[title] = post;

    chrome.storage.sync.set(obj);
    $("#detail").hide();
    const list = document.getElementById("noteTitles");
    const noteEl = document.createElement("li");
    noteEl.setAttribute("class", "noteName");
    let but = document.createElement("div");
    but.setAttribute("id", "deleteBtn");
    but.setAttribute("class", "deleteBtn");
    but.innerText = "-";
    noteEl.innerText = title;
    noteEl.appendChild(but);
    list.appendChild(noteEl);

    noteEl.addEventListener("click", function () {
      $("#title").text(title);
      $("#post-body").text(post);
      $("#detail").show();
    });
    but.addEventListener("click", function () {
      chrome.storage.sync.remove(title, () => {
        noteEl.remove();
        but.remove();
        $("#detail").hide();
      });
    });
    $("#title").text(null);
    $("#post-body").text(null);
  });

  function getItemList() {
    chrome.storage.sync.get(null, function (result) {
      const list = document.getElementById("noteTitles");
      Object.keys(result).forEach((item) => {
        const noteEl = document.createElement("li");
        noteEl.setAttribute("class", "noteName");
        noteEl.innerText = item;
        let but = document.createElement("div");
        but.setAttribute("id", "deleteBtn");
        but.setAttribute("class", "deleteBtn");
        but.innerText = "-";
        noteEl.appendChild(but);
        list.appendChild(noteEl);

        noteEl.addEventListener("click", function () {
          $("#title").text(item);
          $("#post-body").text(result[item]);
          $("#detail").show();
        });
        but.addEventListener("click", function () {
          chrome.storage.sync.remove(item, () => {
            noteEl.remove();
            but.remove();
            $("#detail").hide();
          });
        });
      });
    });
  }

  getItemList();
  $("#notes").hide();
  $("#detail").hide();

  $("#createNew").click(function () {
    $("#detail").show();
  });
  $("#hide").click(function () {
    $("#notes").hide();
    $("#detail").hide();
    $("#openNotes").text("+ Notes");
  });
  $("#noteTitles").click(function () {
    $("#detail").show();
  });
  $("#close").click(function () {
    $("#detail").hide();
    $("#title").text(null);
    $("#post-body").text(null);
  });

  $("#openNotes").click(function () {
    if ($("#openNotes").text() === "- Notes") {
      $("#notes").hide();
      $("#openNotes").text("+ Notes");
      $("#detail").hide();
      $("#title").text(null);
      $("#post-body").text(null); //correction
    } else if ($("#openNotes").text() != "- Notes") {
      $("#notes").show();
      $("#openNotes").text("- Notes");
    }
  });
});

//note titles overflow or fit-content

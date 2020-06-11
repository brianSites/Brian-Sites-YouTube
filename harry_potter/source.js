let apiData;
$.ajax({
    url: "data.json",
    dataType: "json",
    type: "get",
    cache: false,
    success: data => {
        apiData = data;
        audio = new Howl({
            src: [apiData[0].audio_links[0]],
            volume: 0.5
        });
    }
});
let book_number = 1;
let chapter_number = 1;
let playing = false;
let audio;
$(".navbar-label").click(event => {
    if (event.currentTarget.classList[1] == "philosopher-stone") {
        book_number = 1;
    } else if (event.currentTarget.classList[1] == "chamber-of-secrets") {
        book_number = 2;
        console.clear();
    } else if (event.currentTarget.classList[1] == "prisoner-of-azkaban") {
        book_number = 3;
    } else if (event.currentTarget.classList[1] == "goblet-of-fire") {
        book_number = 4;
    } else if (event.currentTarget.classList[1] == "order-of-the-phoenix") {
        alert("Not ready!");
    } else if (event.currentTarget.classList[1] == "half-blood-prince") {
        alert("Not ready!");
    } else if (event.currentTarget.classList[1] == "deathly-hallows") {
        alert("Not ready!");
    };
    chapter_number = 1;
    $(".book-icon").attr("src", apiData[7][book_number - 1]);
    $(".book-name").html(apiData[book_number - 1].book_name);
    $(".current-chapter").html(chapter_number);
    $(".chapter-name").html(apiData[book_number - 1].chapter_names[chapter_number - 1]);
    $(".pause-play").attr("src", "Images/ui_play.png");
    playing = false;
    audio.stop();
    audio = new Howl({
        src: [apiData[book_number - 1].audio_links[chapter_number - 1]],
        volume: 0.5
    });
});
$(".restart").click(() => audio.seek(0));
$(".backwards").click(() => audio.seek(audio.seek() - 10));
$(".pause-play").click(() => {
    if (playing == true) {
        $(".pause-play").attr("src", "Images/ui_play.png");
        playing = false;
        audio.pause();
    } else {
        $(".pause-play").attr("src", "Images/ui_pause.png");
        playing = true;
        audio.play();
    };
});
$(".forwards").click(() => audio.seek(audio.seek() + 10));
$(".chapter-backwards").click(() => {
    if (chapter_number > 1) {
        chapter_number--;
        $(".current-chapter").html(chapter_number);
        $(".chapter-name").html(apiData[book_number - 1].chapter_names[chapter_number - 1]);
        $(".pause-play").attr("src", "Images/ui_play.png");
        playing = false;
        audio.stop();
        audio = new Howl({
            src: [apiData[book_number - 1].audio_links[chapter_number - 1]],
            volume: 0.5
        });
    };
});
$(".chapter-forwards").click(() => {
    if (chapter_number < apiData[book_number - 1].number_of_chapters) {
        chapter_number++;
        $(".current-chapter").html(chapter_number);
        $(".chapter-name").html(apiData[book_number - 1].chapter_names[chapter_number - 1]);
        $(".pause-play").attr("src", "Images/ui_play.png");
        playing = false;
        audio.stop();
        audio = new Howl({
            src: [apiData[book_number - 1].audio_links[chapter_number - 1]],
            volume: 0.5
        });
    };
});

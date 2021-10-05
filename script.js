let chapters = [{
        "isEvent": false,
        "title": "Projet 1",
        "description": "Site statique HTML et CSS",
        "begin": "2021/09/27 GMT+2",
        "end": "2021/10/08 GMT+2",
    },
    {
        "isEvent": true,
        "title": "Hackaton 1",
        "begin": "2021/11/25 GMT+1",
        "end": "2021/11/26 GMT+1",
    },
    {
        "isEvent": false,
        "title": "Projet 2",
        "description": "Site dynamique (POO)",
        "begin": "2021/10/25 GMT+2",
        "end": "2021/11/19 GMT+1",
    },
    {
        "isEvent": true,
        "title": "Talent week",
        "begin": "2021/12/06 GMT+1",
        "end": "2021/12/10 GMT+1",
    },
    {
        "isEvent": true,
        "title": "Hackaton 2",
        "begin": "2022/01/10 GMT+1",
        "end": "2022/01/12 GMT+1",
    },
    {
        "isEvent": false,
        "title": "Projet 3",
        "description": "Site complexe, clients réels",
        "begin": "2021/11/29 GMT+1",
        "end": "2022/01/28 GMT+1",
    },
];

let timeline = document.getElementsByClassName("timeline")[0];
for (let i = 0; i < chapters.length; ++i) {
    let chapter = chapters[i];

    // Creating title
    let titleDiv = document.createElement('div');
    titleDiv.classList.add("timeline-chapter");
    titleDiv.classList.add("timeline-chapter-" + ((i % 2 === 1) ? "even" : "odd"));

    if (chapter["isEvent"]) {
        let eventH3 = document.createElement('h3');
        eventH3.classList.add('timeline-event');
        eventH3.innerText = chapter["title"];
        titleDiv.appendChild(eventH3);
    } else {
        let titleH3 = document.createElement('h3');
        titleH3.classList.add("timeline-title");
        titleH3.innerText = chapter["title"];
        titleDiv.appendChild(titleH3);

        let titleP = document.createElement('p');
        titleP.classList.add("timeline-text");
        titleP.innerText = chapter["description"];
        titleDiv.appendChild(titleP);
    }

    // Creating bullet
    let bulletDiv = document.createElement('div');
    bulletDiv.classList.add("timeline-bullet");

    let lineStart = document.createElement('div');
    lineStart.classList.add("timeline-line");
    if (i == 0)
        lineStart.classList.add("timeline-start");
    bulletDiv.appendChild(lineStart);

    let circleDiv = document.createElement('div');
    circleDiv.classList.add("timeline-circle");

    const dateBegin = Date.parse(chapter['begin']);
    const dateEnd = Date.parse(chapter['end']);
    const now = Date.now();
    let percent = (now - dateBegin) * 100 / (dateEnd - dateBegin);
    percent = Math.max(Math.round(percent), 0) + "%";
    circleDiv.style.setProperty('--fill-percent', percent);
    circleDiv.id = "timeline-circle-tippy" + i;
    bulletDiv.appendChild(circleDiv);

    let lineEnd = document.createElement('div');
    lineEnd.classList.add("timeline-line");
    if (i == chapters.length - 1)
        lineEnd.classList.add("timeline-end");
    bulletDiv.appendChild(lineEnd);

    // Creating placeholder
    let phDiv = document.createElement('div');
    phDiv.classList.add("timeline-ph");

    if (i % 2 === 1) {
        timeline.appendChild(phDiv);
        timeline.appendChild(bulletDiv);
        timeline.appendChild(titleDiv);
    } else {
        timeline.appendChild(titleDiv);
        timeline.appendChild(bulletDiv);
        timeline.appendChild(phDiv);
    }

    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const dateBeginStr = (new Date(dateBegin)).toLocaleDateString(undefined, options);
    const dateEndStr = (new Date(dateEnd)).toLocaleDateString(undefined, options);
    tippy("#" + circleDiv.id, {
        content: "Du " + dateBeginStr + " au " + dateEndStr + ".",
    });
}

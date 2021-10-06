let chapters = [{
        "isEvent": false,
        "title": "Projet 1",
        "description": "Site statique",
        "begin": "2021/09/27 GMT+2",
        "end": "2021/10/08 GMT+2",
        "link": "#project1",
    },
    {
        "isEvent": true,
        "title": "Hackathon 1",
        "begin": "2021/11/25 GMT+1",
        "end": "2021/11/26 GMT+1",
        "link": "#eventHackathon",
    },
    {
        "isEvent": false,
        "title": "Projet 2",
        "description": "Site dynamique",
        "begin": "2021/10/25 GMT+2",
        "end": "2021/11/19 GMT+1",
        "link": "#project2",
    },
    {
        "isEvent": true,
        "title": "Talent week",
        "begin": "2021/12/06 GMT+1",
        "end": "2021/12/10 GMT+1",
        "link": "#eventTalentWeek",
    },
    {
        "isEvent": true,
        "title": "Hackathon 2",
        "begin": "2022/01/10 GMT+1",
        "end": "2022/01/12 GMT+1",
        "link": "#eventHackathon",
    },
    {
        "isEvent": false,
        "title": "Projet 3",
        "description": "Site & Application",
        "begin": "2021/11/29 GMT+1",
        "end": "2022/01/28 GMT+1",
        "link": "#project3",
    },
];

let timeline = document.getElementsByClassName("timeline")[0];
for (let i = 0; i < chapters.length; ++i) {
    let chapter = chapters[i];

    // Creating title
    let titleA = document.createElement('a');
    titleA.classList.add("timeline-chapter");
    titleA.classList.add("timeline-chapter-" + ((i % 2 === 1) ? "even" : "odd"));
    titleA.href = chapter["link"];

    if (chapter["isEvent"]) {
        let eventH3 = document.createElement('h3');
        eventH3.classList.add('timeline-event');
        eventH3.innerText = chapter["title"];
        titleA.appendChild(eventH3);
    } else {
        let titleH3 = document.createElement('h3');
        titleH3.classList.add("timeline-title");
        titleH3.innerText = chapter["title"];
        titleA.appendChild(titleH3);

        let titleP = document.createElement('p');
        titleP.classList.add("timeline-text");
        titleP.innerText = chapter["description"];
        titleA.appendChild(titleP);
    }

    // Creating bullet
    let bulletA = document.createElement('a');
    bulletA.classList.add("timeline-bullet");
    bulletA.id = "timeline-bullet" + i;
    bulletA.href = chapter["link"];

    let lineStart = document.createElement('div');
    lineStart.classList.add("timeline-line");
    if (i == 0)
        lineStart.classList.add("timeline-start");
    bulletA.appendChild(lineStart);

    let circleDiv = document.createElement('div');
    circleDiv.classList.add("timeline-circle");

    const dateBegin = Date.parse(chapter['begin']);
    const dateEnd = Date.parse(chapter['end']);
    const now = Date.now();
    let percent = (now - dateBegin) * 100 / (dateEnd - dateBegin);
    percent = Math.max(Math.round(percent), 0) + "%";
    circleDiv.style.setProperty('--fill-percent', percent);
    bulletA.appendChild(circleDiv);

    let lineEnd = document.createElement('div');
    lineEnd.classList.add("timeline-line");
    if (i == chapters.length - 1)
        lineEnd.classList.add("timeline-end");
    bulletA.appendChild(lineEnd);

    // Creating placeholder
    let phDiv = document.createElement('div');
    phDiv.classList.add("timeline-ph");

    // Add divs to the parent grid
    if (i % 2 === 1) {
        timeline.appendChild(phDiv);
        timeline.appendChild(bulletA);
        timeline.appendChild(titleA);
    } else {
        timeline.appendChild(titleA);
        timeline.appendChild(bulletA);
        timeline.appendChild(phDiv);
    }

    // Create tooltip
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const dateBeginStr = (new Date(dateBegin)).toLocaleDateString(undefined, options);
    const dateEndStr = (new Date(dateEnd)).toLocaleDateString(undefined, options);
    tippy("#" + bulletA.id, {
        content: "Du " + dateBeginStr + " au " + dateEndStr + ".",
        placement: i % 2 === 0 ? "bottom" : "top",
    });
}

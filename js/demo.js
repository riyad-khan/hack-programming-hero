const milestonesData = JSON.parse(data).data;

// loadMilestones
(function () {
    const data = [];
    milestonesData.forEach((milestone) => {
        return data.push(`<div class="milestone border-b" id="${milestone._id}">
    <div class="flex">
      <div class="checkbox">
			<input type="checkbox" onclick="markMilestone(this,${milestone._id})"/>
		</div>
      <div onclick="openMilestone(this,${milestone._id})">
        <p>
          ${milestone.name}
          <span><i class="fas fa-chevron-down"></i></span>
        </p>
      </div>
    </div>
    <div class="hidden_panel">
      ${milestone.modules.map((module) => {
            return `<div class="module border-b">
        <p>${module.name}</p>
      </div>`;
        }).join("")}
    </div>
  </div>`);
    });

    $(".milestones").innerHTML = `${data.join("")}`;
})();

// openMilestone
function openMilestone(milestoneElement, id) {
    const currentPanel = milestoneElement.parentElement.nextElementSibling,
        showPanel = $(".show"),
        active = $(".active");

    // hide previous panel if any
    if (!currentPanel.classList.contains("show") && showPanel) {
        showPanel.classList.remove("show");
    }
    currentPanel.classList.toggle("show");

    // remove previous active class if any [other than the clicked one]
    if (!milestoneElement.classList.contains("active") && active) {
        active.classList.remove("active");
    }
    milestoneElement.classList.toggle("active");

    showMilestone(id);
}

// showMilestone
function showMilestone(id) {
    const milestoneData = milestonesData[id],
        milestoneImage = $(".milestoneImage"),
        name = $(".title"),
        details = $(".details");

    milestoneImage.style.opacity = "0";
    milestoneImage.src = milestoneData.image;
    name.innerText = milestoneData.name;
    details.innerText = milestoneData.description;
}

// listen for hero img load
$(".milestoneImage").onload = function () {
    this.style.opacity = "1";
};

// mark milestone
function markMilestone(checkBox, id) {
    const milestoneList = $(".milestones"),
        doneList = $(".doneList"),
        item = document.getElementById(id);

    if (checkBox.checked) {
        // mark as done
        milestoneList.removeChild(item);
        doneList.appendChild(item);
    } else {
        // back to main list
        doneList.removeChild(item);
        milestoneList.appendChild(item);

        // sort milestoneList
        const divs = document.querySelectorAll(".milestones .milestone"),
            listItems = [];

        divs.forEach(div => listItems.push(div));
        listItems.sort((a, b) => a.id - b.id);
        listItems.forEach(item => milestoneList.appendChild(item));
    }
}

// selector
function $(value) {
    return document.querySelector(value);
}

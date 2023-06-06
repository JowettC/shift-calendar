document.addEventListener("DOMContentLoaded", function() {
    const shiftForm = document.getElementById("shiftForm");
    shiftForm.addEventListener("submit", handleFormSubmit);
  
    const storedStartDate = localStorage.getItem("startDate");
    if (storedStartDate) {
      document.getElementById("startDate").value = storedStartDate;
    }
  
    handleFormSubmit(); // Populate the calendar on page load
  });
  

function handleFormSubmit(event) {
    event.preventDefault();

    const startDate = document.getElementById("startDate").value;
    localStorage.setItem("startDate", startDate);
    const calendar = document.getElementById("calendar");

    $(calendar).fullCalendar("destroy"); // Destroy previous calendar if any

    const shifts = generateShifts(startDate, 60); // Generate shifts for the next 6 months

    $(calendar).fullCalendar({
        defaultView: "month",
        events: shifts,
        header: {
            left: "prev,next today",
            center: "title",
            right: "month,agendaWeek,agendaDay"
        }
    });
}

function generateShifts(startDate, months) {
    const shifts = [];
    const currentDate = new moment(startDate);

    for (let i = 0; i < months; i++) {
        const dayShift = {
            title: "Day Shift",
            start: currentDate.format("YYYY-MM-DDT08:00:00"),
            end: currentDate.format("YYYY-MM-DDT20:00:00"),
            color: "#00cc00"
        };

        const nightShift = {
            title: "Night Shift",
            start: currentDate.add(1, "days").format("YYYY-MM-DDT20:00:00"),
            end: currentDate.add(1, "days").format("YYYY-MM-DDT08:00:00"),
            color: "#0000cc"
        };

        const dayOff = {
            title: "Day Off",
            start: currentDate.add(1, "days").format("YYYY-MM-DDT00:00:00"),
            end: currentDate.format("YYYY-MM-DDT23:59:00"),
            color: "#cccccc"
        };

        shifts.push(dayShift, nightShift, dayOff);
        currentDate.add(1, "days");
    }

    return shifts;
}
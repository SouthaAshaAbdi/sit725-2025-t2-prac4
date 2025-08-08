const clickMe = () => {
  alert("Fill in the form!");
};

const submitForm = () => {
  let formData = {
    title: $("#title").val(),
    image: $("#image").val(),
    link: $("#link").val(),
    description: $("#description").val()
  };

  console.log("Form Data Submitted: ", formData);

  // Send form data to the backend
  $.ajax({
    url: '/api/spiders', // your backend endpoint
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(formData),
    success: function(response) {
      console.log(response.message);
      alert("Spider saved successfully!");
    },
    error: function(xhr, status, error) {
      console.error("Error submitting spider data:", error);
      alert("Error saving spider!");
    }
  });
};

const addCards = (items) => {
  console.log("Items received:", items);
  items.forEach((item) => {
    let itemToAppend =
      '<div class="col s4 center-align">' +
      '<div class="card medium">' +
      '<div class="card-image waves-effect waves-block waves-light">' +
      '<img class="activator" src="' + item.image + '">' +
      '</div><div class="card-content">' +
      '<span class="card-title activator grey-text text-darken-4">' +
      item.title +
      '<i class="material-icons right">more_vert</i></span>' +
      '<p><a href="#">' + item.link + '</a></p></div>' +
      '<div class="card-reveal">' +
      '<span class="card-title grey-text text-darken-4">' +
      item.title +
      '<i class="material-icons right">close</i></span>' +
      '<p class="card-text">' + item.description + '</p>' +
      '</div></div></div>';
    $("#card-section").append(itemToAppend);
  });
};

const getSpiders = () => {
  $.get('/api/spiders', (response) => {
    console.log("Received data from server:", response.data);
    addCards(response.data);
  });
};

$(document).ready(function () {
  $(".materialboxed").materialbox();
  $("#formSubmit").click(() => {
    submitForm();
  });
  getSpiders(); // Load spider cards from DB
  $(".modal").modal();
});

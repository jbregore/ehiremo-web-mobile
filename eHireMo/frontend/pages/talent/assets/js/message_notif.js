var xhttp = new XMLHttpRequest();
xhttp.open(
    "GET",
    "../../../backend/api/messages/get_message_count.php"
);
xhttp.send();
xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        let results = JSON.parse(this.response);
        if (results.total_message_count.total_message_count == 0) {
            $("#message-count").attr('style', "display:none;");
        } else {
            $("#message-count").text(results.total_message_count.total_message_count);
        }
    }
}

$(document).on('click', '#message-notif', function () {
    var xhttp = new XMLHttpRequest();
    xhttp.open(
        "PUT",
        "../../../backend/api/messages/update_message_count.php"
    );
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let results1 = JSON.parse(this.response);
        }
    }
});
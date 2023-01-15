
module.exports.getDate = getDate; // can be simplified to exports.getDate = anonymous function

function getDate() {
    var today = new Date();
    var options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    };

    var day = today.toLocaleDateString('en-US', options);
    var year = today.toLocaleDateString('en-US', {year: 'numeric'})

    return {day, year};
}

exports.getDay = function () {
    var today = new Date();
    var options = {
    weekday: 'long',
    };

    var day = today.toLocaleDateString('en-US', options);

    return day;
}
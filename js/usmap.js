$(document).ready(function() {
    var apiKey = "80b94ea6aa50d2d6c650d46fe3c23af6" // Enter your API Key here
    console.log(`state_info is: ${state_info}`) // Notice the templating here, use that when you form your url


    // TODO
    // Iterate over the state_info array and call the api for each state_name to get the current temperature
    // Example to call the api using state_name
    // This should be done inside the for loop
    for ( var state in state_info){
      if(state_info.hasOwnProperty(state)){
        var state_obj = state_info[state]
        var latitude = state_obj.lat;
        var longitude = state_obj.lng;
        var url =`https://api.darksky.net/forecast/${apiKey}/${latitude},${longitude}`;
        console.log(url)
        console.log(state)
        $.ajax({url:url, dataType:"jsonp", ajaxState: state}).then(function(data) {
            state = this.ajaxState
            console.log(data)
            var temperature = null
            // TODO
            // Fill in the RHS of the below line and uncomment it. Remember how we accessed the temperature in Lab 9.
            var temperature = data.currently.temperature
            //TODO
            //temperature color
            var color = "#808080"
            if(temperature <= 10)
              color = "#6495ED"
            else if(temperature <= 20)
              color = "#7FFFD4"
            else if(temperature <= 30)
              color = "#0000FF"
            else if(temperature <= 40)
              color = "#008B8B"
            else if(temperature <= 50)
              color = "#00BFFF"
            else if(temperature <= 60)
              color = "#F08080"
            else if(temperature <= 70)
              color = "#CD5C5C"
            else if(temperature <= 80)
              color = "#8B0000"
            else if(temperature <= 90)
              color = "#B22222"
            else
              color = "#FF0000"
            $('#'+ state).css('fill', color);   // Example on how to fill colors for your state.

        });
      }
    }

});

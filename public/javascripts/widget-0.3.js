var mySource = document.currentScript.src;
var docroot = mySource.substr(0, mySource.indexOf('/javascripts'))
console.log("docroot ->" + docroot + "<-");

function loadWidget() {

  $("<link/>", {
     rel: "stylesheet",
     type: "text/css",
     href: "//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"
  }).appendTo("head");

  $("<link/>", {
     rel: "stylesheet",
     type: "text/css",
     href: docroot + "/stylesheets/widget.css"
  }).appendTo("head");

  $("<link/>", {
     rel: "stylesheet",
     type: "text/css",
     href: docroot + "/stylesheets/root.css"
  }).appendTo("head");

  $('#control').append(' \
      <audio id="audio-ringback-tone" preload="auto" loop> \
        <source src="https://upload.wikimedia.org/wikipedia/commons/c/cd/US_ringback_tone.ogg" type="audio/ogg"> \
      </audio> \
      <div class="vox-widget-wrapper hidden"> \
      <div class="vw-main"> \
        <div class="vw-header"> \
          <span class="vw-title" id="vw-title"> \
            Calling \
          </span> \
          <span class="vw-animated-dots">.</span> \
          <span class="vw-animated-dots">.</span> \
          <span class="vw-animated-dots">.</span> \
          <div class="vw-actions"> \
            <a href="#" id="full-screen"><i class="vw-icon vx-icon-full-screen-off"></i></a> \
            <a href="#" id="close-screen"><i class="vw-icon vx-icon-close"></i></a> \
          </div> \
        </div> \
        <div class="vw-body"> \
          <div id="vw-unable-to-acces-mic" class="vw-unable-to-acces-mic hidden"> \
            <p style="color: red;">Oops. It looks like we are unable to use your microphone.</p> \
            <p>Please enable microphone access in your browser to allow this call</p> \
          </div> \
          <div id="vw-in-call"> \
            <div id="vw-btn-group" class="vw-btn-group"> \
              <a href="#"> \
                <i class="vw-icon vx-icon-mic"></i> \
                <div id="microphone" class="int-sensor"> \
                  <em id="mic5"></em> \
                  <em id="mic4"></em> \
                  <em id="mic3"></em> \
                  <em id="mic2"></em> \
                  <em id="mic1"></em> \
                </div> \
              </a> \
              <a href="#" class="hidden"> \
                <i class="vw-icon vx-icon-vol"></i> \
                <div id="volume" class="int-sensor"> \
                  <em id="vol5"></em> \
                  <em id="vol4"></em> \
                  <em id="vol3"></em> \
                  <em id="vol2"></em> \
                  <em id="vol1"></em> \
                </div> \
              </a> \
              <a href="#" id="dialpad"><i class="vw-icon vx-icon-pad"></i></a> \
            </div> \
            <a href="#" class="vw-end-call"><i class="vw-icon vx-icon-phone"></i>End Call</a> \
            <div id="vw-dialpad" class="vw-dialpad"> \
              <ul> \
                <li class="vw-tl">1</li> \
                <li>2</li> \
                <li class="vw-tr">3</li> \
                <li>4</li> \
                <li>5</li> \
                <li>6</li> \
                <li>7</li> \
                <li>8</li> \
                <li>9</li> \
                <li class="vw-bl">*</li> \
                <li>0</li> \
                <li class="vw-br">#</li> \
              </ul> \
            </div> \
          </div> \
          <div id="vw-rating" class="vw-rating hidden"> \
            <form name="rating"> \
              <div id="vw-rating-question" class="vw-question">How was the quality of your call?</div> \
              <div id="vw-rating-stars" class="vw-stars"></div> \
              <div id="vw-rating-message" class="vw-message">Any additional feedback? \
                <input type="text" name="rating-message" id="rating-message" placeholder="Optional"" class="form-control"> \
              </div> \
              <div id="vw-rating-button" class="vw-button"> \
                <button class="btn-style btn-style-disabled" id="send-rating"> \
                  <span>Send</span> \
                </button> \
              </div> \
            </form> \
          </div> \
          <div id="vw-rating-after-message" class="vw-rating hidden"> \
            <p>Thank you for using our service</p> \
          </div> \
          <div class="vw-footer"> \
            <a href="https://voxbone.com" target="_blank">powered by:</a> \
          </div> \
        </div> \
    </div> \
  ');

  window.addEventListener('message', function(event) {
    // console.log(event.data);
    var message = event.data;

    if (typeof message === 'string' && message.substring(0,12) == 'setMicVolume') {
      // console.log("Vol -> " + message.substring(12,13));
      var vol = parseInt(message.substring(12,13));

      $("#microphone em").removeClass();
      if (vol > 0) $("#mic1").addClass('on');
      if (vol > 1) $("#mic2").addClass('on');
      if (vol > 2) $("#mic3").addClass('on');
      if (vol > 3) $("#mic4").addClass('on');
      if (vol > 4) $("#mic5").addClass('peak');
      return;
    };

    switch(event.data) {
      case 'openWidgetWithoutDialPad':
        $("#dialpad").addClass('hidden');
        $("#vw-title").text("Waiting for User Media");
        $("#microphone em").removeClass('on').removeClass('off');
        $(".vw-animated-dots").removeClass('hidden');
        $(".vox-widget-wrapper").removeClass('hidden');
        $("#vw-in-call").removeClass('hidden');
        $("#vw-unable-to-acces-mic").addClass('hidden');
        $(".vw-body").removeClass('hidden');
        $("#full-screen").removeClass('hidden');
        $(".vw-rating").addClass('hidden');
        break;
      case 'openWidget':
        $("#vw-title").text("Waiting for User Media");
        $("#microphone em").removeClass('on').removeClass('off');
        $(".vw-animated-dots").removeClass('hidden');
        $(".vox-widget-wrapper").removeClass('hidden');
        $("#vw-in-call").removeClass('hidden');
        $("#vw-unable-to-acces-mic").addClass('hidden');
        $(".vw-body").removeClass('hidden');
        $("#full-screen").removeClass('hidden');
        $(".vw-rating").addClass('hidden');
        break;
      };
  });

  $('#send-rating').click(function(e) {
    e.preventDefault();

    var rate = $('#vw-rating-stars').raty('score');
    var comment = $('#rating-message').val();

    if (!rate && !comment) return;

    var obj = {
      rate: rate,
      comment: comment,
      url: document.URL,
      did: voxbone.WebRTC.previous_call_did,
      callid: voxbone.WebRTC.previous_call_id,
    };

    console.log(JSON.stringify(obj));

    $.ajax({
      type: "POST",
      url: docroot + "/rate",
      data: JSON.stringify(obj),
      contentType: "application/json"
    }).done($("#vw-rating-after-message").removeClass('hidden'));

    $("#vw-rating").addClass('hidden');
  });

  function resetRating() {
    $('#send-rating').addClass("btn-style-disabled");
    $('#vw-rating-stars').raty('cancel');
    $('#rating-message').val('');
  };

  $('#vw-rating-stars').raty({
    starType  : 'i',
    click     : function(score, evt) {
      // alert("Score: " + score);
      $('#send-rating').removeClass("btn-style-disabled");
      $('#send-rating').addClass("btn-style");
    }
  });

  function stopRingbackTone(){
    $("#audio-ringback-tone").trigger('pause');
    $("#audio-ringback-tone").prop("currentTime",0);
  };

  function playRingbackTone(){
    $("#audio-ringback-tone").prop("currentTime",0);
    $("#audio-ringback-tone").trigger('play');
  };

  function send_voxbone_interaction(message){
    if (!(typeof voxbone.WebRTC.rtcSession.isEstablished === "function") || voxbone.WebRTC.rtcSession.isEnded())
      return;

    switch(message) {
      case 'hang_up':
        voxbone.WebRTC.hangup();
        break;
      case 'volume-mute':
        // TODO: implement
        break;
      case 'microphone-mute':
        if (voxbone.WebRTC.isMuted)
          voxbone.WebRTC.unmute();
        else
          voxbone.WebRTC.mute();
        break;
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
      case '0':
      case '*':
      case '#':
        voxbone.WebRTC.sendDTMF(message);
        break;
    }
  };

  function call_action(message) {
    send_voxbone_interaction(message);
  };

  $('.vw-dialpad li').click(function(e) {
    e.preventDefault();
    call_action(this.textContent);
  });

  $(".vw-end-call").click(function(e) {
    e.preventDefault();
    stopRingbackTone();
    $("#vw-title").text("Call Ended");
    $(".vw-animated-dots").addClass('hidden');
    call_action('hang_up');
  });

  $("#close-screen i").click(function(e) {
    e.preventDefault();
    $(".vox-widget-wrapper").addClass('hidden');

    // send "no rating"
    console.log("send no rating");
    var data =  { rate: 0, comment: 'Closed Without Rating', url: document.URL };
    var message = { action: 'rate', data: data };
    call_action(message);
  });

  $("#full-screen i").click(function(e) {
    e.preventDefault();
    $(".vw-body").toggleClass('hidden');
    $(this).toggleClass('vx-icon-full-screen-on').toggleClass('vx-icon-full-screen-off');
  });

  $(".vw-icon.vx-icon-pad").click(function(e) {
    e.preventDefault();
    $("#dialpad").toggleClass('active');
    $(".vw-dialpad").toggleClass('active');
  });

  $(".vw-icon.vx-icon-mic").click(function(e) {
    e.preventDefault();
    $("#microphone em").toggleClass('on').toggleClass('off');
    call_action('microphone-mute');
  });

  $(".vw-icon.vx-icon-vol").click(function(e) {
    e.preventDefault();
    $("#volume em").toggleClass('on').toggleClass('off');
    call_action('volume-mute');
  });

  $("#launch_call").click(function(e) {
    e.preventDefault();
    $("#vw-title").text("");
    $(".vw-animated-dots").removeClass('hidden');
    makeCall();
    window.onbeforeunload=function(e){
      voxbone.WebRTC.unloadHandler();
    }
  });

  $("#hangup_call").click(function(e) {
    e.preventDefault();
    voxbone.WebRTC.hangup();
    stopRingbackTone();
    $(".vw-body").addClass('hidden');
    $("#full-screen").addClass('hidden');
  });

  voxbone.WebRTC.customEventHandler.progress = function(e){
    $("#vw-title").text("Calling");
    $(".vw-animated-dots").removeClass('hidden');
  };

  voxbone.WebRTC.customEventHandler.failed = function(e){
    stopRingbackTone();
    if (e.cause == JsSIP.C.causes.USER_DENIED_MEDIA_ACCESS) {
      $("#vw-title").text("Unable to Access Mic");
      $("#vw-unable-to-acces-mic").removeClass('hidden');
      $("#vw-in-call").addClass('hidden');
    } else {
      $("#vw-title").text("Call Failed" + (e.cause != null ? ":\n " + e.cause :""));
    }

    $(".vw-animated-dots").addClass('hidden');
    $(".vw-body").addClass('hidden');
    $("#full-screen").addClass('hidden');
  }

  voxbone.WebRTC.customEventHandler.accepted = function(e){
    voxbone.WebRTC.previous_call_id = voxbone.WebRTC.callid;
    stopRingbackTone();
    $("#vw-title").text("In Call");
    $(".vw-animated-dots").addClass('hidden');
  }

  voxbone.WebRTC.customEventHandler.ended = function(e){
    stopRingbackTone();
    $("#vw-title").text("Call Ended!");
    $("#vw-in-call").addClass('hidden');
    $(".vw-animated-dots").addClass('hidden');
    $(".vw-body").removeClass('hidden');
    $("#full-screen").addClass('hidden');
    resetRating();
    $("#vw-rating").removeClass('hidden');
  }

  voxbone.WebRTC.customEventHandler.getUserMediaFailed = function(e){
  }

  voxbone.WebRTC.customEventHandler.getUserMediaAccepted = function(e){
    $("#vw-title").text("Calling");
    playRingbackTone();
    console.log('local media accepted');
    voxbone.Logger.loginfo("local media accepted");
  }

  voxbone.WebRTC.customEventHandler.localMediaVolume = function(e){
    if(voxbone.WebRTC.isMuted) return;

    if (e.localVolume > 0.30) postMessage("setMicVolume5","*")
    else if (e.localVolume > 0.20) postMessage("setMicVolume4","*")
    else if (e.localVolume > 0.10) postMessage("setMicVolume3","*")
    else if (e.localVolume > 0.05) postMessage("setMicVolume2","*")
    else if (e.localVolume > 0.01) postMessage("setMicVolume1","*")
    else if (e.localVolume <= 0.01) postMessage("setMicVolume0","*")
  }

  JsSIP.debug.enable('JsSIP:*');
};

var VoxWidget = ( function() {
  return {

    makeCall: function(config){
      voxbone.WebRTC.configuration.uri = (new JsSIP.URI(scheme="sip", user=(config.callerId).replace(/[^a-zA-Z0-9-_]/g, ''), "voxbone.com")).toString();
      voxbone.WebRTC.configuration.display_name = config.callerId;
      voxbone.WebRTC.configuration.post_logs = true;

      if(config.context)
        voxbone.WebRTC.context = config.context;

      if(config.send_digits)
        voxbone.WebRTC.configuration.dialer_string = config.send_digits;

      if(!config.supported) {
        console.log("WebRTC is NOT supported!" + config.ibc);
        if(config.ibc == 'hide_widget')
          return;
        else if(config.ibc == 'link_button_to_a_page')
          window.open(config.link_button_to_a_page_value,'_blank');
      } else {
        if (voxbone.WebRTC.isCallOpen()) {
          return;
        }
        if(config.dial_pad=="true") {
          postMessage("openWidget","*");
        } else {
          postMessage("openWidgetWithoutDialPad","*");
        }
        voxbone.WebRTC.previous_call_did = config.number;
        voxbone.WebRTC.call(config.number);
      }
    }
  };
})();

$.getScript("//cdnjs.cloudflare.com/ajax/libs/raty/2.7.0/jquery.raty.min.js", loadWidget);

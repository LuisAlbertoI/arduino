module.exports = controller;

function controller(data) {
  const five = require('johnny-five');
  const board = new five.Board();
  const { name, port } = data;

  switch (name) {
    case 'Animacion':

      board.on("ready", () => {
        const led = new Led(port);

        led.fade({
          easing: "linear",
          duration: 1000,
          cuePoints: [0, 0.2, 0.4, 0.6, 0.8, 1],
          keyFrames: [0, 250, 25, 150, 100, 125],
          onstop() {
            console.log("Animation stopped");
          }
        });

        board.wait(2000, () => led.fadeOut());
      });

      break;
    case 'Parpadeo':

      board.on("ready", function () {
        var led = new five.Led(port);
        led.blink(500);
      });

      break;
    case 'Fundido':

      board.on("ready", () => {
        const led = new Led(port);

        led.fadeIn();

        // Toggle the led after 5 seconds (shown in ms)
        board.wait(5000, () => {
          led.fadeOut();
        });
      });

      break;
    case 'Pulso':

      board.on("ready", () => {
        // Create a standard `led` component
        // on a valid pwm pin
        const led = new Led(port);

        led.pulse();

        // Stop and turn off the led pulse loop after
        // 10 seconds (shown in ms)
        board.wait(10000, () => {

          // stop() terminates the interval
          // off() shuts the led off
          led.stop().off();
        });
      });

      break;
  }
}
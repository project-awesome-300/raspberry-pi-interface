sudo modprobe bcm2835-v4l2 #loading the picam driver
cd /home/pi/test && ng serve &
sleep 90
#startx &
#sleep 10
firefox  -P "web" -no-remote http://localhost:4200 &
sleep 5
xdotool key F11 

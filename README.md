# PWO_audioMocap

## workflow

### capture 360 footage + audio
- record 360 video and audio 
- record voices of actors with lavalier microphones

### preproces video
use [YOLO_Deepsort](https://github.com/mikel-brostrom/Yolov5_StrongSORT_OSNet) to track humans in the movie.
'''
python track.py --source ../inputfile.mp4 --yolo_model crowdhuman_yolov5m.pt --classes 0
'''
it returns a text file in the subdirectory "runs/track/exp/tracks/"
This file can be parsed using  'python process_deeptrack.py'  
You need the common IDs for individuals tracked, you can get these by watching the processed video in "runs/track/exp/"

the script asks the following question:
`do you want to load previous IDs file? y/n :`
if you have a previous run using the same IDs this could be useful, but in most cases answer no
`how many persons do you want to generate positions for?`
questionbs says it all, enter the amount of voices you want to track
`mainID?` the base number, first ID this individual voice has
  
`enter additional alias IDs, enter '0' when done`  
every alias ID yolodeeptrack assigned to this individual. IDS normally only change when a person leaves the image, or crosses from 360>0 degrees. 
  
`do you want to load previous trackdata file? y/n :`  
this loads previous tracks, usefull if you want to replay a file in realtime.

After this you should have a midifile containing CC messages 20 + mainID
you can load this into a DAW for spatialisation of the audio

### bugs and caveats  
- midi CCs are hardcoded  
- filenames are hardcodes  
- this is POC code  
- many undocumented bugs and features (like realtime, or the fact and how that you should set ppb, bpm, fps, video resolution, etc) 

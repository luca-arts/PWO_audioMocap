import pickle
from time import time,sleep
import os
import mido
from mido import Message, MidiFile, MidiTrack, second2tick


#### configuration options
tpb = 480 ## resolution of MIDI file (ticks per beat)
bpm = 120 ## beats per minute
fps = 30 ## frames per second of video file VIDEO FILES CANNOT HAVE A VARIABLE FRAME RATE! if that is the case, reencode prior to processing
loop = False ## keep repeating, only usefull for debugging and realtime
realtime = False ## if true, send midi at video framerate, if False, writes file as fast as possible
midifilename = 'posdata_track480rt.mid'
# normalise data, input video dimensions here
maxx = 3840
maxy = 1920
totalframes = 3529



columns, lines = os.get_terminal_size()
mid = MidiFile(ticks_per_beat=tpb)
track = MidiTrack()
mid.tracks.append(track)

##### helpers
def calculateAngle(x, xsize, maxx):
    angle = (x + xsize/2)/maxx - 0.5
    return angle

def printNoFlush(text, x):
        s = f"\033[{x}G" + text
        S = s[:columns]
        print(S, end='',  flush=True)


# print(mido.get_output_names()) # To list the output ports
outportlist = mido.get_output_names()

for i,dev in enumerate(outportlist):
    print("port ", i, " ", dev)

mididev = int(input("select mididevice from list (0-based index number) ")) 

outport = mido.open_output(outportlist[mididev])
print(outport, "selected")




##### main

loadit = input("do you want to load previous IDs file? y/n :")
if loadit == "y":
    IDs = pickle.load(open('IDs.pickle', 'rb'))
else:
    n = int(input("how many persons do you want to generate positions for? "))
    IDs = {}

    for i in range(n):
        mainID = int(input("mainID? "))
        alias = mainID
        IDs[mainID] = []
        IDs[mainID].append(alias)
        while alias != 0:
            alias = int(input("enter additional alias IDs, enter '0' when done "))
            if alias != 0:
                IDs[mainID].append(alias)

    #save IDs tot disk
    pickle.dump(IDs, open('IDs.pickle', 'wb'))

print(IDs)

loadit = input("do you want to load previous trackdata file? y/n :")
if loadit == "y":
    trackdata = pickle.load(open('trackdata.pickle', 'rb'))
else:
    
    tracks = open('/home/kaos/Documents/LUCA/PWO/AudioMOCAP/Yolov5_DeepSort_Pytorch/runs/track/exp/tracks/20220919_144159_037.txt', 'r')
    frametracks = tracks.readlines()
    # trackdata =  {0:[{"id":0,"x":0,"y":0,"sx":0,"sy":0}]}  # frame : [list of tracked sound objects, top left x, y, sizex, sizey]
    trackdata =  {}
    for line in frametracks:
        # print(line.split())
        l = line.split()
        frame = int(l[0])
        id = int(l[1])
        try:
            trackdata[frame]
        except KeyError:
            trackdata[frame] = []
        #check if this line contains usefull IDs
        print(line)
        for mainID in IDs:
            # print("mainID = ", IDs[mainID], id)
            if id in IDs[mainID]:
                # print("this alias was found in this frame", id, l[0])
                trackdata[frame].append({"id":mainID,"x":int(l[2]),"y":int(l[3]),"sx":int(l[4]),"sy":int(l[5])})

    print(trackdata)
    pickle.dump(trackdata, open('trackdata.pickle', 'wb'))


# print (trackdata)
frames = list(trackdata.keys())
# print(frames)
# while loop:
count=0
prevcount = 0
starttime = time()
t1 = starttime
miditime = 0

miditick = 0
lastmiditick = miditick
# ticksperframe = 32 
ticksperframe = int(((bpm/60)*tpb)/fps)
print("ticksperframe = ", ticksperframe)

if realtime:
    while t1 < starttime + totalframes/fps:    
        t1 = time()
        t2 = starttime + frames[count]/fps
        if t1 > t2:
            if len(trackdata[frames[count]]) > 0:
                delta = (frames[count] - frames[prevcount])
                posstring = " "*columns
                for i,tr in enumerate(trackdata[frames[count]]):
                    miditick = int(delta  * ticksperframe)
                    if i > 0:
                        miditick = 0
                    x = tr['x']
                    xsize = tr['sx']
                    a = calculateAngle(x, xsize, maxx)
                    xpos = columns*(a+0.5)
                    xpos = int(xpos)
                    posstring = posstring[:xpos] + str(tr['id']) + posstring[xpos+1:]
                    outport.send(mido.Message('control_change', control=20+tr['id'], value=int((a+0.5)*127)))
                    track.append(Message('control_change', control=20+tr['id'],  value=int((a+0.5)*127), time=miditick))
                    lastmiditick = miditick
                printNoFlush(posstring,0)
                prevcount = count
            count += 1
        else:
            sleep(0.02)
else:
    frame = 0
    while frame < totalframes-1:
        # print("\n",frame," ",count,"\n")
        if len(trackdata[frames[count]]) > 0:
            delta = frames[count] - frames[prevcount]
            posstring = " "*columns  
            for i,tr in enumerate(trackdata[frames[count]]):
                miditick = int(delta  * ticksperframe)
                if i > 0:
                    miditick = 0
                    # print("\n",frame," ",miditick,"\n")
                x = tr['x']
                xsize = tr['sx']
                a = calculateAngle(x, xsize, maxx)
                xpos = columns*(a+0.5)
                xpos = int(xpos)
                posstring = posstring[:xpos] + str(tr['id']) + posstring[xpos+1:]
                outport.send(mido.Message('control_change', control=20+tr['id'], value=int((a+0.5)*127)))
                track.append(Message('control_change', control=20+tr['id'],  value=int((a+0.5)*127), time=miditick))
                # lastmiditick = miditick
            printNoFlush(posstring,0)
            prevcount = count
        count += 1
        frame = frames[count]


mid.save(midifilename)



import pickle
from time import time,sleep
import os
import mido



columns, lines = os.get_terminal_size()

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
print(outportlist)

mididev = int(input("select mididevice from list (0-based index number) ")) 

outport = mido.open_output(outportlist[mididev])





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
# normalise data, input video dimensions here
maxx = 3840
maxy = 1920
fps = 30
totalframes = 3473

# print (trackdata)
frames = list(trackdata.keys())
# print(frames)
count=0
starttime = time()
t1 = starttime
while t1 < starttime + totalframes/fps:
    t1 = time()
    t2 = starttime + frames[count]/30
    # if frames[count]%30 == 0:
        # print("sec = " , int(frames[count]/30))
    # print("----------")
    # print("t1 = ", t1)
    # print("t2 = ", t2)
    # print("--------")
    # other stuff here
    # t2 = time.time()
    # delta = t2 - t1
    if t1 > t2:
        # send midi
        # print("frame = ", frames[count])
        if len(trackdata[frames[count]]) > 0:
            # if int(frames[count]/30) > 80:
                # print(trackdata[frames[count]])
                posstring = " "*columns
                for i,tr in enumerate(trackdata[frames[count]]):
                    x = tr['x']
                    xsize = tr['sx']
                    a = calculateAngle(x, xsize, maxx)
                    xpos = columns*(a+0.5)
                    xpos = int(xpos)
                    # print(xpos)
                    posstring = posstring[:xpos] + str(tr['id']) + posstring[xpos+1:]
                    outport.send(mido.Message('control_change', control=tr['id'], value=int((a+0.5)*127)))
                # printNoFlush(" "*columns,0)
                printNoFlush(posstring,0)
            # pass
        count += 1
        # do stuff
    else:
        # sleep for a bit
        sleep(0.02)




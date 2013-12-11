#! /usr/bin/env python3
import cgi
import yate
import pickle
import json
import socket

def valid_ip(address):
    try:
        socket.inet_aton(address)
        return True 
    except:
        return False 

def readpic(picname):
    try:
        with open(picname,"rb") as putdata:
            return pickle.load(putdata)
    except IOError as err:
        return str(err)
    except EOFError:
        return "none"
    except pickle.PickleError as perr:
        return str(perr)

def addKnownNodes(picname,cont):
    try:
        with open(picname,"wb") as putdata:
            pickle.dump(cont,putdata)
    except IOError as err:
        return str(err)
    except EOFError:
        return "none"
    except pickle.PickleError as perr:
        return str(perr)

def main():
    print(yate.start_response())
    form = cgi.FieldStorage()
    finame = "knownnodes.dat"
    cont = readpic(finame)
    key1 = "ip"
    key2 = "port"
    key3 = "reqtype"
    if key1 in form and key2 in form and cont == "none":
        cont = {}
        ip = form[key1].value
        port = form[key2].value
        cont[ip] = port
        sss = addKnownNodes(finame,cont)
        cont = json.dumps(cont)
        print(cont)
    elif key3 in form and form[key3].value == "achieve":
        cont = json.dumps(cont)
        print(cont);
    elif key1 in form and key2 in form and key3 in form and form[key3].value == "setip":
        ip = form[key1].value
        if valid_ip(ip):
            port = form[key2].value
            cont[ip] = port
            addKnownNodes(finame,cont)
            cont = readpic(finame)
            cont = json.dumps(cont)
            print(cont);
        else:
            status = {'status':'0'}
            print(json.dumps(status))

main()

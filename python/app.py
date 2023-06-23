from flask import Flask, request
from youtube_transcript_api import YouTubeTranscriptApi
from transformers import pipeline
from googletrans import Translator,LANGUAGES
import cgi
import sys

app = Flask(__name__)

@app.get('/summary')
def summary_api():
    url = request.args.get('url', '')
    video_id = url.split('=')[1]
    summary = get_summary(get_transcript(video_id))






    # form = cgi.FieldStorage()
    # text = form.getvalue('text')
    # print(text)
    return summary
    # trans = Translator()
    # trans = trans.translate(summary,src='en',dest='te')
    # trans = trans.text
    # return trans

def get_transcript(video_id):
    transcript_list = YouTubeTranscriptApi.get_transcript(video_id)
    transcript = ' '.join([d['text'] for d in transcript_list])
    return transcript

def get_summary(transcript):
    summariser = pipeline('summarization')
    summary = ''
    for i in range(0, (len(transcript)//1000)+1):
        summary_text = summariser(transcript[i*1000:(i+1)*1000])[0]['summary_text']
        summary = summary + summary_text + ' '
    return summary




if __name__ == '__main__':
    app.run()
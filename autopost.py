import requests
import json
import os
import datetime
now_path = os.path.dirname(os.path.abspath(__file__))

MEMBERID = 'qvT5WRfwGTIM4%2blHdntqxNOchxaLrc%2bl0DQo0KKs9seu%2fJSk%2fUA6m1rrCqTPvcWH'

CAMPAIGN_DICT = dict()
CAMPAIGN_DICT['CLICK'] = '128'          # 클릭형
CAMPAIGN_DICT['CLICK_STAY'] = '1'       # 클릭-체류형
CAMPAIGN_DICT['PLAY'] = '32'            # 재생형
CAMPAIGN_DICT['INSTALL'] = '8'          # 설치-실행형
CAMPAIGN_DICT['PARTICIPANT'] = '64'     # 참가형
CAMPAIGN_DICT['SELL'] = '4'             # 판매형

CAMPAIGN_LIST = [
    {'type': 'click', 'value': '128'},
    {'type': 'click_stay', 'value': '1'},
    {'type': 'play', 'value': '32'},
    {'type': 'install', 'value': '8'},
    {'type': 'participant', 'value': '64'},
    {'type': 'sell', 'value': '4'},
]
CATEGORY_LIST = [
    {"Code": 100000, "Name": "교육",            "Eng": "edu"},
    {"Code": 110000, "Name": "자격증",          "Eng": "certificate"},
    {"Code": 120000, "Name": "IT",              "Eng": "it"},
    {"Code": 130000, "Name": "건강",            "Eng": "health"},
    {"Code": 250000, "Name": "병원",            "Eng": "hospital"},
    {"Code": 140000, "Name": "게임",            "Eng": "game"},
    {"Code": 150000, "Name": "뷰티",            "Eng": "beauty"},
    {"Code": 160000, "Name": "금융",            "Eng": "finance"},
    {"Code": 260000, "Name": "보험",            "Eng": "insurance"},
    {"Code": 170000, "Name": "경영/창업",       "Eng": "business"},
    {"Code": 180000, "Name": "자동차",          "Eng": "car"},
    {"Code": 190000, "Name": "쇼핑",            "Eng": "shopping"},
    {"Code": 200000, "Name": "리빙",            "Eng": "living"},
    {"Code": 210000, "Name": "엔터테인먼트",    "Eng": "entertainment"},
    {"Code": 220000, "Name": "사회",            "Eng": "social"},
    {"Code": 230000, "Name": "기타",            "Eng": "others"},
    {"Code": 240000, "Name": "성인",            "Eng": "adult"},
]


def getAdList(PAGESIZE, CAMPAIGN_TYPE, CATEGORY_NAME, MIN_CLICK_POINT=0, MIN_CURRENT_POINT=0):
    URL = f'''\
    http://tenping.kr/adbox/list?
    MemberID={MEMBERID}&
    PageSize={PAGESIZE}&
    CampaignType={CAMPAIGN_TYPE}&
    MinClickPoint={MIN_CLICK_POINT}&
    MinCurrentPoint={MIN_CURRENT_POINT}&
    Category={CATEGORY_NAME}&
    ExistMiddleImage=&
    ExistRectangleImage=&
    IsPartner=\
    '''.strip().replace("\n", "").replace("    ", '').replace(" ", '')
    response = requests.get(URL)
    json_data = json.loads(response.text)
    return json_data['List']


def isValidAd(CONTENT_ID):
    URL = f'http://tenping.kr/adbox/statecheck?MemberID={MEMBERID}&ContentID={CONTENT_ID}'
    response = requests.get(URL)
    json_data = json.loads(response.text)
    return json_data['IsLive']


def getCurrentCategory():
    # GET CUR CATEOGORY
    filesPath = f'{now_path}\\_data\\'
    fileNameWithModifyList = []

    for f_name in os.listdir(f"{filesPath}"):

        curFilePath = f'{filesPath}{f_name}'
        curFile = json.load(open(curFilePath, 'r', encoding='UTF-8'))

        modifyTime = curFile['lastModifyTime']
        category = f_name.replace(".json", "")
        fileNameWithModifyList.append((modifyTime, category))

    sorted_file_list = sorted(fileNameWithModifyList,
                              key=lambda tup: tup[0], reverse=True)

    if(len(sorted_file_list) == 0):
        return CATEGORY_LIST[0]

    print(sorted_file_list)
    lastCategoryIndex = next((index for (index, item) in enumerate(
        CATEGORY_LIST) if item['Eng'] == sorted_file_list[0][1]), None)
    nextCategoryIndex = 0

    if lastCategoryIndex != len(CATEGORY_LIST) - 1:
        nextCategoryIndex = lastCategoryIndex + 1

    return CATEGORY_LIST[nextCategoryIndex]


def main():
    # STEP 1 : GET CURRENT CATEGORY
    curCategoryDict = getCurrentCategory()
    curCategory = curCategoryDict['Eng']
    curCategoryCode = curCategoryDict['Code']
    print("CUR CATEOGORY : ", curCategory)

    # STEP 2 : GET NEW AD DATA
    curFilePath = f"{now_path}\\_data\\{curCategory}.json"
    existList = []
    newItemList = []
    try:
        fileData = json.load(open(curFilePath, 'r', encoding='UTF-8'))
        existList = fileData['data']
    except Exception as e:
        print(e)

    for (idx, campaign) in enumerate(CAMPAIGN_LIST):
        print("CUR CONTENT TYPE : ", campaign['type'])

        apiData = getAdList(
            PAGESIZE=30, CAMPAIGN_TYPE=campaign['value'], CATEGORY_NAME=curCategoryCode)

        changeIdx = 0
        for apiItem in apiData:
            isExistItem = next((item for item in existList if
                                item['ContentID'] == apiItem['ContentID']), None) != None
            if not isExistItem:
                newItemList.append(apiItem)
                changeIdx += 1
        print(changeIdx, " 개의 새로운 아이템")

    print(f"총 {len(newItemList)}개의 새로운 아이템이 있습니다")
    newItemList += existList

    # SAVE JSON
    cur_time = datetime.datetime.utcnow().strftime('%Y%m%d%H%M%S%f')
    lastModifyTime = f'{str(cur_time)}'

    resDict = dict()
    resDict['category'] = curCategory
    resDict['lastModifyTime'] = lastModifyTime
    resDict['data'] = newItemList

    with open(f'{curFilePath}', 'w', encoding='UTF-8') as file:
        file.write(json.dumps(resDict, ensure_ascii=False))


if __name__ == "__main__":
    main()

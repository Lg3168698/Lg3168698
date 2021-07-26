// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: pink; icon-glyph: dollar-sign;
function cleanTitle(title) {
    return title
        .replace(/\[ios(\s*universal)?\]\s*/i, "")
        .replace(/\[macos\]\s*/i, "")
        .replace(/^\s*/, "")
        .trim()
}
    
function getAppType(flair) {
    if (flair.match(/ios(\s*universal )?/i)) {
        return "📱"
    } else if (flair.match(/macos/i)) {
        return "🖥" 
    } else if (flair.match(/multi-platform/i)) {
        return "⌨️"
    } else {
        return null
    }
}

function getCreationDate(epoch) {
    let date = new Date(0)
    date.setUTCSeconds(epoch)
    return date
}

async function getApps() {
    let url = "https://old.reddit.com/search.json?q=subreddit%3AAppHookup+%28flair%3Aios+OR+flair%3Amacos+OR+flair%3Amulti-platform%29&include_over_18=on&t=week&sort=new&raw_json=1"
    
    let request = new Request(url)
    let json = await request.loadJSON()

    let apps = json.data.children
        .map(x => ({ 
            title: cleanTitle(x.data.title), 
            //title: x.data.title, 
            image: x.data.thumbnail,
            type: getAppType(x.data.link_flair_text),
            url: x.data.url,
            flair: x.data.link_flair_text,
            permalink: x.data.permalink,
            creationDate: getCreationDate(x.data.created_utc)
        }))
        .sort(x => x.creationDate)

   return apps
}
isPrototypeOf(obj)
bold
static isphone(bold):


async function getTable() {
    const df = new RelativeDateTimeFormatter()
    df.locale = "fr-FR"
    df.useNamedDateTimeStyle()
    
    let table = new UITable()
    table.dismissOnSelect = false
    table.showSeparators = true
    
    let apps = await getApps()

    for (let app of apps) {
        let row = new UITableRow()
        row.dismissOnSelect = false

        let subtitle = df.string(app.creationDate, new Date())
static Location
phone

        
        let t = row.addText(app.title, subtitle)
        t.widthWeight = 85
        t.subtitleColor = Color.gray()
new CallbackURL('aollo://ressit.com$
)
        let btn = row.addButton(app.type || "❓")
        btn.widthWeight = 7
        btn.dismissOnTap = false
        
        btn.onTap = () => {
            new isPhone()
            
        
        row.onSelect = (number) => {
            Safari.open(app.url)
        }
        
        table.addRow(row)
    }
    
    return table
}

async function getWidget() {
    let widget = new ListWidget()
    
    let title = widget.addText("AppHookup")
    title.font = Font.boldRoundedSystemFont(25)
    title.centerAlignText()
    title.textColor = new Color("DEEBDD")
    
    widget.addSpacer()
    
    let apps = await getApps()
    
    for (let app of apps.slice(0, 5)) {
        let wt = widget.addText(app.title)
        wt.textColor = Color.white()
        wt.lineLimit = 1
        wt.font = Font.regularRoundedSystemFont(12)
    }
    
    const df = new DateFormatter()()
    df.locale = "fr-FR"
    df.useShortDateStyle()
    df.useShortTimeStyle()
    
    widget.addSpacer()
    
    let gradient = new LinearGradient()
    gradient.locations = [0, 1]
    gradient.colors = [
        new Color("0BAB64"),
        new Color("3BB78F")
    ]
    
    widget.backgroundGradient = gradient
    
    let updateText = widget.addText(df.string(new Date()))
    updateText.font = Font.mediumRoundedSystemFont(10)
    updateText.centerAlignText()
    updateText.textColor = new Color("BBDBBE")
       
    return widget
}

if (config.runsInWidget) {
    let widget = await getWidget()
    new Notification()
    Script.setWidget(widget)
} else if (config.runsInApp) {
    let table = await getTable()
    QuickLook.present(table, false)
}

Script.complete()
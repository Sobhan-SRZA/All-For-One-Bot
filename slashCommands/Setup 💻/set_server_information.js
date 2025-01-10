const { 
  MessageButton,
  MessageActionRow,
  MessageSelectMenu,
  MessageEmbed,
  Permissions
} = require('discord.js');
const db = require('quick.db')
module.exports = {
  name: 'setserverinformation',
  description: "setup the server all information automatic.",
  category: 'Setup 💻',
  cooldown: 1,
  userPermissions: [""],
  botPermissions: [""],
  options: [{
    name: "info-channel",
    description: "Select a channel to setupping server information.",
    type: "CHANNEL",
    channelTypes: ["GUILD_TEXT"],
    required: false
  }],

  run: async (client, interaction, args) => {
  var prefix = await db.fetch(`prefix_${interaction.guild.id}`)||bot.prefix;
  let logsChannel = interaction.guild.channels.cache.find(c => c.id === db.get(`modlog_${interaction.guild.id}`));
  interaction.reply({
    content:  `successfully`,
    ephemeral: true,
  })
  interaction.channel.send({
    emeds: [new MessageEmbed()
      .setAuthor({
        name: `Server All Information`,
        iconURL: interaction.guild.iconURL({ dynamic: true })
      })
      .setColor(client.colors.none)
      .setTitle(`${client.emotes.info}| All Informations About "${interaction.guild.name}"`)
      .setImage("https://cdn.discordapp.com/attachments/919864051444645938/988141611802300458/digital-marketing-gif.gif")
      .setDescription(`
      .اینجا ${interaction.guild.name} هستش، یک جامعه کوچک ایرانی که سعی میکنیم محیطی سالم و به دور از هرگونه حاشیه برای ممبر هایمان فراهم بکنیم و اوقات خوشی رو کنار همدیگه سپری کنیم
      به کمک گزینه های منوی زیر شما میتوانید قوانین ما، توضیحات چنل ها و سوالات پر تکرار را مشاهده کنید، رول های خودتون رو دریافت کنید، یک تیکت برای ارتباط با تیم ادمینی بسازید، بازخورد خودتون از سرور رو برای ما ارسال کنید، خودتون رو معرفی کنید، و یا در صورت علاقه مند بودن از ما حمایت کنید! از حضورتون در سرور لذت ببرید ما مشتاقانه منتظر دیدن شما توی چت هستیم.      
      Language: EN
      Here's ${interaction.guild.name}, a small ${interaction.guid.region} community that we try to provide a healthy environment for our members and away from any margins and spend happy times together
        With the help of the menu options below you can see our rules, channel descriptions and frequently asked questions, get your own roles, create a ticket to communicate with the admin team, send us your feedback from the server, yourself Introduce, or support us if you are interested! Enjoy your presence on the server. We look forward to seeing you in the chat.
      `)
    ],
    components: [new MessageActionRow()
      .addComponents([new MessageSelectMenu()
          .setPlaceholder(`${client.emotes.help}| Select One OF The Options`)
          .setOptions([
            {
              label: 'Server Rules',
              value: 'rules',
              emoji: {
                name: client.emotes.rules,
              }
            },
            {
              label: 'Channels Info',
              value: 'channel_info',
              emoji: {
                name: client.emotes.channel
              }
            },
            {
              label: 'FAQ',
              value: 'faq',
              emoji: {
                name: client.emotes.faq
              }
            },
            {
              label: 'Select Roles',
              value: 'role',
              emoji: {
                name: client.emotes.role
              }
            },
            {
              label: 'Create Ticket',
              value: 'ticket',
              emoji: {
                name: client.emotes.ticket
              }
            }
          ])
          .setMinValues(1)
          .setMaxValues(1)
          .setCustomId("allinfo")  
      ])
    ]
  })

 }
}
/**
 درود به بکس دوست داشتنی فریک|
هرگونه تبلیغ از هر سروری در داخل سرور پرایوت فریک ممنوع می‌باشد:x: زیرا این فمیلی بر اساس قانون های هارمونی وصف شده ‌و دلیلی بر تبلیغ سرور در سرور پرایوت نمیبینیم 

درود به گنگ فریک 

به دلیل برخی از مشکلات پیش امده از تمامی اعضا خواهش مندیم از تمسخر عقاید یکدیگر به شدت پرهیز کنند 

از موضوعاتی همچون اختلاف بر سر bts بر سر عقاید مذهبی بر سر مسائل سیاسی و تمسخر lgbt به شدت پرهیز کنید 

رعایت حد دوستی و اتحاد بین اعضای اکیپ مهمترین موضوع میباشد و بنده از شما خواستارم به ادمین ها کمک کنید و از دعوا و حاشیه خود داری کنید

|قوانین سرور|
1. رعایت ادب و احترام در همه ی بخش های سرور و نسبت به همه ی اشخاص سرور اجباری میباشد 

2. هرگونه بی احترامی به اعتقادات و سلایق دیگران ممنوع می باشید 

3. اسپم و سعی در خراب کردن چت و سایر بخش های سرور ممنوع می باشد و در صورت مشاهده برخورد می شود

4. به هیچ عنوان فردی را بدون دلیل منشن نکنید درصورت مشاهده موجب میوت شدن شما از چت خواهد شد

5. هرگونه صحبت در مورد استریمرا و یوتوبر های محترم که باعث ایجاد حاشیه و یا سوء استفاده برخی از افراد خواهد شد در سرور ممنوع می باشد

6. ارسال هرگونه محتوای نامناسب در سرور ممنوع می باشد و بن به همراه دارد

7. بحث کردن راجب مسائل سیاسی و نژاد پرستی ممنوع می باشد

8. ایجاد صدا های دلخراش و نامناسب در ویس چنل ها ممنوع می باشد و در صورت مشاهده میوت ویس خواهید شد

9. فحاشی در ویس چت ها ممنوع می باشد و در صورت مشاهده برخورد خواهد شد.
 
Bezzarz Server Rules !

😊 1. ba hame aaza ​ba ehteram raftar konid va afkar khod ra be raveshi sazande bayan konid.
💳 2. az gozashtan name va profile +18 baraye khod khoddari konid.
📨 3. az ferestadan poshte sar ham yek text, picture, video, va ... ya mention kardan poshte sare ham afrad dakhel server khoddari konid. ‍
🛡 4. moragheb harim khososi khod va digaran bashid.
🤕 5. az azar o azyat kardan va badraftari ba aaza server khoddari konid.
🏛 6. az hargone sohbat siasi o mazhabi kamelan khoddari konid.
🔞 7. ersal hargone mohtava +18 mesle picture, video, va ... dar server mojaz nist.
🔇 8. tabligh dar hame channel ha be gheyr az Self Promo mamno ast.
🛑age ba ghavanin movafeghi 👍 ro bezan ta be chanel ha dastresi dashte bashi🛑
‍
RULES
:00pepe_hello: اسپم ممنوع در صورت اسپم میوت میشوید

:00pepe_hello: اگر در سرور کسی با شما شوخی ندارد با کسی شوخی نکنید

:00pepe_hello: به هیچکس بی احترامی نکنید در صورت رویت میوت میشوید

:00pepe_hello: گذاشتن عکس , اسم , بنر , استاتوس مستهجن ممنوع در صورت رویت از سرورکیک میشوید

:00pepe_hello: ارسال لینک در دی ام افراد ممنوع در صورت رویت یا ریپورت از سرور بن میشوید

:00pepe_hello: ما تو سرور ناراحتی لیو بده نداریم اگه به کسی همچین حرفی بزنید به مدت 7 روز میوت میشید

:00pepe_hello: هر کاری رو در چنل مخصوص خودش انجام بدید

:00pepe_hello: سؤالتتون رو درباره سرور رو فقط و فقط در چنل ساپورت بپرسید

:00pepe_hello: در چت از بات ها استفاده نکنید

:00pepe_hello: در کار ساپورتر ها و ادمین ها و .... دخالت نکنید در غیر این صورت ادمین ها میتوانند به شما وارن بدهند یا شما را میوت کنند

:00pepe_hello: از الفاظ رکیک و +18 استفاده کنید

:00pepe_hello: از بحث های سیاسی و نژاد پرستی بپرهیزید

:00pepe_hello: به ادمین ها احترام بگذارید و ان ها را بدون دلیل منشن نکنید

:00pepe_hello: بدون دلیل تیکت باز نکنید و در تیکت ها ادمین هارو منشن نکنید

:00pepe_hello: به قوانین دیسکورد و سرور عمل کنید در غیر اینصورت از سرور به صورت دائمی بن میشوید

:00pepe_hello: از یموجی های سرور استفاده کنید لطفا

:00pepe_hello: اگر کسی به شما بی احترامی کرد به صورت گفته شده در ویدیو فرد را ریپورت کنید

:00pepe_hello: نورمی نباشید و شاد باشید مرسی اه
🇮🇷 Persian Rules
🥰 • شخصیت خوبی از خودتون نشون بدید
با همه همیشه محترمانه رفتار کنین و ادب رو رعایت کنین، استفاده از الفاظ رکیک و فحاشی/مسخره کردن دیگران خلاف قوانین ماست، همه‌ ما اینجا هستیم تا با هم وقت بگذرونیم و حال همدیگه رو بهتر کنیم نه اینکه اعصاب همدیگه رو خورد کنیم

🖼️ • از اسم و پروفایل مناسب استفاده کنید
عزیزانی که در سرور فعالیت میکنند و اسمشون اول لیست ممبر ها هستش توی یوزرنیم و یا استاتوس خودتون از کلمات بد استفاده نکنید و عکس اشخاص سیاسی و یا مذهبی رو روی پروفایلتون نگذارید

👀 • از بحث های متفرقه در چنل ها خودداری کنید
هر چنل تاپیک(موضوع) مخصوص خودشو داره لطفا در هیچ کدام از چنل ها به بحث های آف تاپیک(خارج از موضوع) نپردازید برای مثال سوال های دیسکوردی رو باید در چنل ❔〢questions بپرسید نه اینکه توی 🎥〢media راجبش سوال کنید

📨 • از اسپم کردن و بهم زدن نظم چنل ها خودداری کنید
از فرستادن پیام، استیکر، ایموجی، کامندهای ربات و منشن‌های بیش از حد و پشت سر هم خودداری کنید. اینکار باعث میشه محیط کانال‌ها شلوغ و گیج‌کننده به نظر برسه و همچنین باعث اذیت شدن دیگران میشه و همه رو از داشتن یه گفتگوی سالم دور می‌ کنه

🔞 • محتوای نامناسب را ارسال نکنید
فعالیت‌های غیرقانونی یا مشکوک اصلا برای ما قابل قبول نیستن و مورد برخورد شدید قرار می‌گیرن، ارسال پورن و محتوای آزار دهنده به طور کلی ممنوعه لطفا توجه کنید که ممکنه اینجا از هر رده سنی افرادی حضور داشته باشن.

🔒 • وارد حریم شخصی دیگران نشوید
به حریم شخصی و خصوصی دیگران احترام بگذارید، پخش کردن اطلاعات شخصی افراد مثل پخش آدرس، شماره تماس، کد ملی، عکس و... بدون اجازه آنها و خلاف میل آنها ممنوع می باشد و همچنین سوال پرسیدن راجب این موارد اگر شخص علاقه ای نداشته باشد هم ممنوع میباشد ما دوست داریم همه اینجا احساس امنیت و راحتی کامل داشته باشن

🫂 • از گفتگو های نژاد پرستانه خودداری کنید
به هیچ قوم و نژاد، عقیده، دین و مذهب، طرز فکر و... که مخالف نظر شماست توهین نکنید صرفا حق دارید به صورت محترمانه نظر خودتون رو بیان کنید تمامی افرادی که اینجا حضور دارن از هر کجای دنیا با هر قومیتی برای ما با ارزش و محترم هستند، پس از شما هم میخوایم همینطوری رفتار کنین و هیچوقت محتوای نژادپرستانه یا توهین‌آمیزی رو به اشتراک نذارین
🏛️ • مسائل سیاسی برای ما جذاب نیستند
هرگونه بحث سیاسی، دعوا، توهین و... ممنوع می باشد این موضوعات پیچیده و فلسفی بیشتر اوقات باعث دلخوری و ایجاد درگیری‌هایی می شوند که ما هیچوقت نمی‌خوایم اینجا توی محیط صمیمیمون داشته باشیمشون

📢 • تبلیغ کردن و پروموت کردن حد و مرز هایی دارد
پروموت کردن خودتون به صورت آزار دهنده ممنوع می باشد
- مثلا توی چت موضوع راجب یوتیوبه اینکه لینک چنلتون رو بفرستید و یا هی به همه بگید که شمارو فالو کنن ممنوع و خلاف قوانین هستش ولی خب مثلا بگید "اره منم یه چنل یوتیوب دارم و توی فلان زمینه در حال فعالیتم" در صورتی که بقیه ممبر ها اذیت نشن موردی نداره

💬 • برای دیگران ایجاد مزاحمت نکنید
تبلیغ در پیوی ممبر ها و یا چت سرور ممنوع و خلاف قوانین هستش در صورت ریپورت کردن شما از سرور محروم می شوید
- اینکه شما برید پیوی یک ممبری و باهاش چت کنید و بعد اون لینک سرورش رو به شما بده تبلیغ به حساب نمیاد چون شما شروع کننده چت بودید

🧙🏻‍♂️ • در تصمیم و نظر ادمین های سرور دخالت نکنید
لطفا وقتی که ادمین های سرور سعی دارن سرور رو جایی آروم و امن نگه دارن اعتراض نکنید. بهتره قبل از انجام هر کاری به درست و اشتباه بودنش و البته نتیجه‌ ای که کار شما می‌تواند در بر داشته باشه فکر کنید شاید یک مورد در قوانین ما ذکر نشده باشد ولی اگر کمی فکر کنید متوجه می شوید که این کار نتیجه خوبی در بر نخواهد داشت پس از انجامش خودداری کنید تا هیچوقت با مشکلی مواجه نشوید
:flag_ir: اینجا iTz Club هستش، یک جامعه کوچک ایرانی که سعی میکنیم محیطی سالم و به دور از هرگونه حاشیه برای ممبر هایمان فراهم بکنیم از این رو از شما انتظار میرود که قوانین سرور رو مطالعه و در پیروی از آنها بکوشید، جهت مشاهده قوانین اصلی دیسکورد و یا قوانین اختصاصی سرور بر روی یکی از دکمه های زیر کلیک کنید

:flag_us: Here is iTz Club, a small Iranian community that we try to provide a healthy environment for our members away from any margins, so you are expected to read the server rules and try to follow them, Click on one of the buttons below to view the Community Guidelines rules of Discord or the server rules.
🇺🇸 English Rules
🥰 • Show a good personality
You are not all allowed to swear / insult / ridicule anyone, Always treat everyone with respect and be polite. We are all here to spend time together and make each other better, not to upset each other.

🖼️ • Use a good username and profile
Dear ones who active in the server and whose name is the first on the list of members, do not use bad words in your username or status and do not put photos of political or religious people on your profile.

👀 • Avoid miscellaneous discussions on the channels
Every channel has its own topic please do not talk off topics in any channel and let the channel be on the topic, For example, questions about discord should go to ❔〢questions not like sending your questions in 🎥〢media.

📨 • Avoid spamming and disrupting the order of the channels
Avoid sending too many messages in a row, stickers, emojis, bot commands, and mentions. This makes the channels look crowded and confusing, as well as annoying others and keeping everyone away from having a healthy conversation.

🔞 • Don't send NSFW & NSFL media
Illegal or suspicious activity is not acceptable to us at all and we will severely punish. Posting pornography and annoying content are generally forbidden. Please note that people of all ages may be present here.

🔒 • Do not intrude on the privacy of others
Respect the privacy and privacy of others, the dissemination of personal information of persons such as an address, contact number, national code, photo, etc. is prohibited without their permission and against their will, and also ask these things if the person Pay special attention. It is not forbidden, we would like them to feel completely safe and comfortable here.

🫂 • Avoid racist talk
Do not insult any ethnic group, belief, religion, way of thinking, etc. that is against your opinion. They are valuable and respected, so we want you to do the same and never share racism or insults.
🏛️ • Political issues are not attractive to us
Any political discussion, fights, insults, etc. are forbidden. These complex and philosophical issues often cause annoyance and conflicts that we never want to have here in our intimate environment.

📢 • Advertising and promotion have limits
Promoting Your Stuff is fine but do not spam it in other's dm or annoying

💬 • Do not disturb others in chat
Advertising in members dm or server channels is prohibited and against the rules, if you report, you will be deprived of the server.

🧙🏻‍♂️ • Do not interfere in the decision and opinion of server administrators
Please do not object when the server admins try to keep the server in a quiet place. It's better than doing everything right and wrong and the result that your work can do about the rules that are not mentioned, but if you think a little you can realize that your work can have a good result. Refrain from doing so until you never encounter a problem.
:2021_Snowsgiving_Emojis_001_Star: Server Rules
Rule 1
از آزار و اذیت یکدیگر،توهین شخصی ،تبعیض جنسیتی ،حملات کلیشه ای مسخره کردن و انتشاراطلاعات غلط در هرموضوعی بدون دانستن آن بپرهزید.

Avoid harassment, personal insults, sexual harassment, stereotyped attacks, ridicule and dissemination of false information in any subject without knowing it.
--------------
Rule 2
محتوای پورن و +18 را در چنل های غیر از دیوونه خونه ارسال نکنید / اگر مطمئن نیستید که محتوا در دسته پورن یا +18 قرار دارد آن را ارسال نکنید.

Do not post porn and +18 content on channels other than divoone khoone / f you are unsure if it's considered NSFW you shouldn't post it.
--------------
Rule 3
از ارسال هرگونه تبلیغ در مورد فروش نیترو یا قرار دادن خدمات،محصولات و لینک سرور های دیگر در چنل ها جداخودداری فرمایید

Do not send any advertisement about selling nitro or placing services, products and other link servers in the channels.
--------------
Rule 4
.از هرگونه مراجعه به پیوی افراد سرور جهت تبلیغ سرور، بات ،محصولات و خدمات جدا خودداری فرمایید.

-Do not advertise to the DM of server people to advertise the server, bot, products and services separately.
--------------
Rule 5
.از ارسال هرگونه توکن گرابر، گیف کرشر،فایل و لینکی که باعث تغییر در کلاینت دیسکورد شود در چنل ها خودداری فرمایید. در صورت مشاهده میتوانید از طریق تیکت به ما اطلاع دهید
Do not send any grabber tokens, gif crushers, files and links that change the Discord client in the channels. If you see, you can inform us via ticket
--------------
Rule 6
قبل از ارسال هرگونه مطلب، پست، متن یا فایل اول قوانین پین شده در هر چنل را بررسی
کنید و سپس اقدام به ارسال آن کنید.

Before sending any content, post, text or file, first check the rules pinned in each channel and then proceed to send it.
--------------
Rule 7
کاربرانی که اقدام به نقض قوانین دیسکورد: سلف بات، لینک نیترو رایگان، کرک نیترو و کلاهبرداری از افراد سرور میکنند بدون هشدار، میوت یا بن خواهند شد.

Users who violate the rules of the discord: self-bot, free nitro link, nitro crack and scam of people on the server without warning, mow or ban
--------------
Rule 8
از هرگونه اسپم بی مورد درچنل های سرور از قبیل استیکر،متن یا فایل جدا خودداری فرمایید
از بازکردن تیکت بی مورد و یا اسپم تیکت بی معنی جدا خودداری فرمایید در این صورت از خدمات سرور محروم میشوید.

Avoid any unnecessary spam on server channels such as stickers, text or separate files
Do not open useless tickets or meaningless separate spam tickets, otherwise you will be deprived of server services.
--------------
Rule 9
از منشن کردن بی مورد و رندوم افراد سرور و ساپورترها خودداری فرمایید
لطفا زمانی که تیکت را باز میکنید کسی را منشن نکنید زیرا تیکت شما به زودی توسط ما بررسی خواهد
شد
Avoid making unnecessary and random mentions of server people and supporters
Please do not mention anyone when you open the ticket because your ticket will be reviewed by us soon
--------------
Rule 10
هرگونه به هم زدن جو دوستانه سرور وارن در پی خواهد داشت از شما خواهشمندیم زمانی که نزاع یا دعوایی رخ میدهد در تلاش برای آرام کردن جو سرور باشید و از هرگونه برهم زدن نظم سرور جدا خودداری فرمایید

Avoid disturbing the friendly atmosphere of the server
And when fighting, try to calm down and protect yourself
--------------
Rule 11
.از توهین به افراد مهم کامیونیتی یا سرور بپرهیزید و آن هارا تا حد امکان زمانی که پیام آن هارا پاسخ میدهید پینگ پیام را خاموش کنید
-Avoid insulting important people in the community or server and turn them off ping as much as possible when responding to the message.
--------------
Rule 12
از عوض کردن اسم خود به اسم های بی معنی، فوش وتوهین و اسم های طولانی خودداری فرمایید
Avoid changing your name to meaningless, offensive and long names
Mr.SIN RE — Today at 6:59 PM
🙂👇قوانین ساده و در عین حال مهم هستند که عبارت اند از👇🙂
:BlueTick:⛔ استفاده از الفاظ رکیک ممنوع

:BlueTick:⛔ فحش و ناسزا ممنوع

:BlueTick:⛔ از تخریب و آزار و اذیت یکدیگر بپرهیزید و متمدن باشید

:BlueTick:⛔ از ارسال فایل های دارای محتوای +18🔞بپرهیزید

:BlueTick:⛔ با یکدیگر رفتار پرخشگرانه نداشته باشید

:BlueTick:⛔اسپم کردن ممنوع

:BlueTick:⛔ لطفا با فرستادن پیام های بی ربط در بعضی چنل ها خودداری کنید
😊 رعایت ادب نشان دهنده شعور و فهم بالای شماست 😊
شو خوش😈

 */
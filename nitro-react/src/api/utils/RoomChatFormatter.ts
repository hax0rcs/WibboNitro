import joypixels from 'emojione';

export const allowedColours: Map<string, string> = new Map();

allowedColours.set('r', 'red');
allowedColours.set('b', 'blue');
allowedColours.set('g', 'green');
allowedColours.set('y', 'yellow');
allowedColours.set('w', 'white');
allowedColours.set('o', 'orange');
allowedColours.set('c', 'cyan');
allowedColours.set('br', 'brown');
allowedColours.set('pr', 'purple');
allowedColours.set('pk', 'pink');

// Adicione as cores que deseja suportar aqui
// ...

const encodeHTML = (str: string) => {
    return str.replace(/([\u00A0-\u9999<>&])(.|$)/g, (full, char, next) => {
        if(char !== '&' || next !== '#') {
            if(/[\u00A0-\u9999<>&]/.test(next)) next = '&#' + next.charCodeAt(0) + ';';

            return '&#' + char.charCodeAt(0) + ';' + next;
        }

        return full;
    });
}

export const RoomChatFormatter = (content: string) => {
    let result = '';

    content = encodeHTML(content);
    content = (joypixels.shortnameToUnicode(content) as string);
    content = content.replace(/\[tag\](.*?)\[\/tag\]/g, '<span class="chat-tag"><b>$1</b></span>');

    // Youtube link
    content = content.replace(
        /(?:http:\/\/|https:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?.*v=|shorts\/)?([a-zA-Z0-9_-]{11})/g,
        '<a href="https://youtu.be/$1" target="_blank">$&</a>'
    );
  
    // Twitter link
    content = content.replace(
        /(?:https?:\/\/)?(?:www\.)?(?:twitter\.com)\/(\w+\/status\/\d+)/g,
        '<a href="https://twitter.com/$1" target="_blank">$&</a>'
    );
  
    // Tiktok link
    content = content.replace(
        /(?:https?:\/\/)?(?:www\.)?(?:vm\.tiktok\.com\/(\w+)|tiktok\.com\/(@\w+\/video\/(\d+)))/g,
        function(match, vmTiktok, tiktokUserVideo, tiktokUser, tiktokVideoId) {
            if (vmTiktok) {
                return `<a href="https://vm.tiktok.com/${ vmTiktok }" target="_blank">${ match }</a>`;
            } else {
                return `<a href="https://www.tiktok.com/${ tiktokUserVideo }" target="_blank">${ match }</a>`;
            }
        }
    );
  
    // Instagram link
    content = content.replace(
        /(?:https?:\/\/)?(?:www\.)?(?:instagram\.com\/(?:p\/([a-zA-Z0-9_-]+)|reels\/([a-zA-Z0-9_-]+)))/g,
        function(match, instagramPost, instagramReel) {
            if (instagramPost) {
                return `<a href="https://www.instagram.com/p/${ instagramPost }" target="_blank">${ match }</a>`;
            } else {
                return `<a href="https://www.instagram.com/reels/${ instagramReel }" target="_blank">${ match }</a>`;
            }
        }
    );

    if(content.startsWith('@') && content.indexOf('@', 1) > -1) {
        let match = null;

        while((match = /@#([a-fA-F0-9]{6})@(.*)/g.exec(content)) !== null) {
            const colorTag = match[0].toString();
            const colorHex = match[1];
            const text = match[2];

            if(!/^[a-fA-F0-9]{6}$/.test(colorHex)) {
                result = text;
            } else {
                result = `<span style="color: #${colorHex}">${text}</span>`;
            }
            break;
        }
    } else {
        result = content;
    }

    return result;
}

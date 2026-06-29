var commands = [];

function cmd(info, func) {
    // Kutengeneza nakala mpya ya info ili kuzuia object mutation error
    var data = { ...info };
    data.function = func;
    
    // Kama hakuna pattern lakini kuna cmdname, tumia cmdname kama pattern
    if (!data.pattern && data.cmdname) {
        data.pattern = data.cmdname;
    }
    
    // Kusafisha na kuandaa alias (iwe string au array) ili zisivunje handler ya bot
    if (!data.alias) {
        data.alias = [];
    } else if (typeof data.alias === 'string') {
        data.alias = data.alias.split(',').map(a => a.trim());
    }
    
    // Kuweka default values kama hazikufafanuliwa kwenye plugin
    if (data.dontAddCommandList === undefined) data.dontAddCommandList = false;
    if (!data.desc) data.desc = '';
    if (data.fromMe === undefined) data.fromMe = false;
    if (!data.category) data.category = 'misc';
    
    commands.push(data);
    return data;
}

module.exports = {
    cmd,
    AddCommand: cmd,
    Function: cmd,
    commands,
};

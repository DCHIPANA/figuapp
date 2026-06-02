export interface AlbumSticker {
    n: number
    label: string
    type?: string
    shortLabel?: string
    imgKey?: string
}

export interface AlbumSection {
    id: string
    name: string
    emoji: string
    type?: string
    group?: string
    stickers: AlbumSticker[]
}

export interface AlbumData {
    id: string
    name: string
    total: number
    coverEmoji: string
    sections: AlbumSection[]
}

export function makeTeam(
    startN: number,
    shieldLabel: string,
    players: string[]
): AlbumSticker[] {
    const stickers: AlbumSticker[] = []

    stickers.push({
        n: startN,
        label: shieldLabel,
        type: 'shield',
        shortLabel: 'Escudo'
    })

    stickers.push({
        n: startN + 1,
        label: 'Foto Grupal',
        type: 'group_photo',
        shortLabel: 'Equipo'
    })

    players.forEach((name, i) => {
        stickers.push({
            n: startN + 2 + i,
            label: name,
            type: 'normal',
            shortLabel: name.split(/\s+/).filter(Boolean).slice(-1)[0] || name
        })
    })

    return stickers
}

export const ALBUM_MUNDIAL_2026: AlbumData = {
    id: 'mundial2026',
    name: 'FIFA World Cup 2026 Impreso',
    total: 980,
    coverEmoji: '🏆',

    sections: [

        // ── INTRODUCCIÓN (1-10) ───────────────────────────────────────────────
        {
            id: 'intro',
            name: 'Introducción',
            emoji: '🏆',
            type: 'special',
            stickers: [
                { n: 0, label: 'Logo PANINI', type: 'special', shortLabel: 'PANINI' },
                { n: 1, label: 'Trofeo FIFA 1', type: 'special', shortLabel: 'Trofeo 1' },
                { n: 2, label: 'Trofeo FIFA 2', type: 'special', shortLabel: 'Trofeo 2' },
                { n: 3, label: 'Mascotas Oficiales', type: 'special', shortLabel: 'Mascotas' },
                { n: 4, label: 'Logo Copa Mundial', type: 'special', shortLabel: 'Logo' },
                { n: 5, label: 'Pelota Oficial', type: 'special', shortLabel: 'Pelota' },
                { n: 6, label: 'Logo Canada', type: 'special', shortLabel: 'Logo CAN' },
                { n: 7, label: 'Logo México', type: 'special', shortLabel: 'Logo MEX' },
                { n: 8, label: 'Logo USA', type: 'special', shortLabel: 'Logo USA' },
            ]
        },
        // ── SELECCIONES (31 en adelante, 20 figuritas c/u) ─────────────────
        // Numeración: n° base de cada selección = 31 + (índice_selección * 20)
        {
            id: 'mex', name: 'Mexico', emoji: '🇲🇽', group: 'CONCACAF', stickers: makeTeam(9, 'Escudo México', [
                'Luis Malagón', //11
                'Johan Vasquez', //12
                'Jorge Sánchez', //13
                'Cesar Montes', //14
                'Jesus Gallardo', //15
                'Israel Reyes', //16
                'Diego Lainez', //17
                'Carlos Rodriguez', //18
                'Edson Alvarez', //19
                'Orbelin Pineda', //20
                'Marcel Ruiz',  //21
                'Érick Sánchez', //22
                'Hirving Lozano', //23
                'Santiago Giménez', //24
                'Raúl Jiménez', //25
                'Alexis Vega', //26
                'Roberto Alvarado', //27
                'Cesar Huerta' //28
            ])
        },
        {
            id: 'rsa', name: 'South Africa', emoji: '🇿🇦', group: 'CAF', stickers: makeTeam(29, 'Escudo Sudafrica', [
                'Ronwen Williams', //31
                'Sipho Chaine', //32
                'Aubrey Modiba', //33
                'Samukele Kabini', //34
                'Mbekezeli Mbokazi', //35
                'Khulumani Ndamane', //36
                'Siyabonga Ngezana', //37
                'Khuliso Mudau', //38
                'Nkosinathi Sibisi', //39
                'Teboho Mokoena', //40
                'Thalente Mbatha', //41
                'Bathusi Aubaas', //42
                'Yaya Sithole', //43
                'Sipho Mbule', //44
                'Lyle Foster', //45
                'Iqraam Rayners', //46
                'Mohau Nkota', //47
                'Oswin Appollis', //48
            ])
        },
        {
            id: 'kor', name: 'South Korea', emoji: '🇰🇷', group: 'AFC', stickers: makeTeam(49, 'Escudo Korea del Sur', [
                'Hyeon-woo Jo', //51
                'Seung-Gyu Kim', //52
                'Min-jae Kim', //53
                'Yu-min Cho', //54
                'Young-woo Seol', //55
                'Han-beom Lee', //56
                'Tae-seok Lee', //57
                'Myung-jae Lee', //58
                'Jae-sung Lee', //59
                'In-beom Hwang', //60
                'Kang-in Lee', //61
                'Seung-ho Paik', //62
                'Jens Castrop', //63
                'Dongg-yeong Lee', //64
                'Gue-sung Cho', //65
                'Heung-min Son', //66
                'Hee-chan Hwang', //67
                'Hyeon-Gyu Oh', //68
            ])
        },
        {
            id: 'cze', name: 'Czechia', emoji: '🇨🇿', group: 'UEFA', stickers: makeTeam(69, 'Escudo Republica Checa', [
                'Matej Kovar', //71
                'Jindrich Stanek', //72
                'Ladislav Krejci', //73
                'Vladimir Coufal', //74
                'Jaroslav Zeleny', //75
                'Tomas Holes', //76
                'David Zima', //77
                'Michal Sadilek', //78
                'Lukas Provod', //79
                'Lukas Cerv', //80
                'Tomas Soucek', //81
                'Pavel Sulc', //82
                'Matej Vydra', //83
                'Vasil Kusej', //84
                'Tomas Chory', //85
                'Vaclav Cerny', //86
                'Adam Hlozek', //87
                'Patrik Schick', //88
            ])
        },
        {
            id: 'can', name: 'Canada', emoji: '🇨🇦', group: 'CONCACAF', stickers: makeTeam(89, 'Escudo Canada', [
                'Dayne St.Clair', //91
                'Alphonso Davies', //92
                'Alistair Johnston', //93
                'Samuel Adekugbe', //94
                'Richie Laryea', //95
                'Derek Cornelius', //96
                'Moïse Bombito', //97
                'Kamal Miller', //98
                'Stephen Eustáquio', //99
                'Ismaël Koné', //100
                'Jonathan Osorio', //101
                'Jacob Shaffelburg', //102
                'Mathieu Choinière', //103
                'Niko Sigur', //104
                'Tajon Buchanan', //105
                'Liam Millar', //106
                'Cyle Larin', //107
                'Jonathan David', //108
            ])
        },
        {
            id: 'bih', name: 'Bosnia and Herzegovina', emoji: '🇧🇦', group: 'UEFA', stickers: makeTeam(109, 'Escudo Bosnia', [
                'Nikola Vasilj', //111
                'Amer Dedic', //112
                'Sead Kolasinac', //113
                'Tarik Muharemovic', //114
                'Nihad Mujakic', //115
                'Nikola Katic', //116
                'Amir Hadziahmetovic', //117
                'Benjamin Tahirovic', //118
                'Armin Gigovic', //119
                'Ivan Sunjic', //120
                'Ivan Basic', //121
                'Dzenis Burnic', //122
                'Esmir Bajraktarevic', //123
                'Amar Memic', //124
                'Ermedin Demirovic', //125
                'Edin Dzeko', //126
                'Samed Bazdar', //127
                'Haris Tabakovic', //128
            ])
        },
        {
            id: 'qat', name: 'Qatar', emoji: '🇶🇦', group: 'AFC', stickers: makeTeam(129, 'Escudo Qatar', [
                'Meshaal Barsham', //131
                'Sultan Albrake', //132
                'Lucas Mendes', //133
                'Homam Ahmed', //134
                'Boualem Khoukhi', //135
                'Pedro Miguel', //136
                'Tarek Salman', //137
                'Mohamed Al-Mannai', //138
                'Karim Boudiaf', //139
                'Assim Madibo', //140
                'Ahmed Fatehi', //141
                'Mohammed Waad', //142
                'Abdulaziz Hatem', //143
                'Hassan Al-Haydos', //144
                'Edmilson Junior', //145
                'Akram Hassan Afif', //146
                'Ahmed Al Ganehi', //147
                'Almoez Ali', //148
            ])
        },
        {
            id: 'sui', name: 'Switzerland', emoji: '🇨🇭', group: 'UEFA', stickers: makeTeam(149, 'Escudo Suiza', [
                'Gregor Kobel', //151
                'Yvon Mvogo', //152
                'Manuel Akanji', //153
                'Ricardo Rodriguez', //154
                'Nico Elvedi', //155
                'Aurèle Amenda', //156
                'Silvan Widmer', //157
                'Granit Xhaka', //158
                'Denis Zakaria', //159
                'Remo Freuler', //160
                'Fabian Rieder', //161
                'Ardon Jashari', //162
                'Johan Manzambi', //163
                'Michel Aebischer', //164
                'Breel Embolo', //165
                'Ruben Vargas', //166
                'Dan Ndoye', //167
                'Zeki Amdouni', //168
            ])
        },
        {
            id: 'bra', name: 'Brazil', emoji: '🇧🇷', group: 'CONMEBOL', stickers: makeTeam(169, 'Escudo Brasil', [
                'Alisson', //171
                'Bento', //172
                'Marquinhos', //173
                'Éder Militão', //174
                'Gabriel Magalhães', //175
                'Danilo', //176
                'Wesley', //177
                'Lucas Paquetá', //178
                'Casemiro', //179
                'Bruno Guimarães', //180
                'Luiz Henrique', //181
                'Vinicius Júnior', //182
                'Rodrygo', //183
                'João Pedro', //184
                'Matheus Cunha', //185
                'Gabriel Martinelli', //186
                'Raphinha', //187
                'Estévão', //188
            ])
        },
        {
            id: 'mar', name: 'Morocco', emoji: '🇲🇦', group: 'CAF', stickers: makeTeam(189, 'Escudo Marruecos', [
                'Yassine Bounou', //191
                'Munir El Kajoui', //192
                'Achraf Hakimi', //193
                'Noussair Mazraoui', //194
                'Nayef Aguerd', //195
                'Romain Saïss', //196
                'Jawad El Yamiq', //197
                'Adam Masina', //198
                'Sofyan Amrabat', //199
                'Azzedine Ounahi', //200
                'Eliesse Ben Seghir', //201
                'Bilal El Khannouss', //202
                'Ismael Saibari', //203
                'Youssef En-Nesyri', //204
                'Abde Ezzalzouli', //205
                'Soufiane Rahimi', //206
                'Brahim Diaz', //207
                'Ayoub El Kaabi', //208
            ])
        },
        {
            id: 'hai', name: 'Haiti', emoji: '🇭🇹', group: 'CONCACAF', stickers: makeTeam(209, 'Escudo Haiti', [
                'Johny Placide', //211
                'Carlens Arcus', //212
                'Martin Expérience', //213
                'Jean-Kevin Duverne', //214
                'Ricardo Adé', //215
                'Duke Lacroix', //216
                'Garven Metusala', //217
                'Hannes Delcroix', //218
                'Leverton Pierre', //219
                'Danley Jean Jacques', //220
                'Jean-Ricner Bellegarde', //221
                'Christopher Attys', //222
                'Derrick Etienne Jr', //223
                'Josue Casimir', //224
                'Ruben Providence', //225
                'Duckens Nazon', //226
                'Louicius Deedson', //227
                'Frantzdy Pierrot', //228
            ])
        },
        {
            id: 'sco', name: 'Scotland', emoji: '🏴', group: 'UEFA', stickers: makeTeam(229, 'Escudo Escocia', [
                'Angus Gunn', //231
                'Jack Hendry', //232
                'Kieran Tierney', //233
                'Aaron Hickey', //234
                'Andrew Robertson', //235
                'Scott McKenna', //236
                'John Souttar', //237
                'Anthony Ralston', //238
                'Grant Hanley', //239
                'Scott McTominay', //240
                'Billy Gilmour', //241
                'Lewis Ferguson', //242
                'Ryan Christie', //243
                'Kenny McLean', //244
                'John McGinn', //245
                'Lyndon Dykes', //246
                'Che Adams', //247
                'Ben Gannon-Doak', //248
            ])
        },
        {
            id: 'usa', name: 'USA', emoji: '🇺🇸', group: 'CONCACAF', stickers: makeTeam(249, 'Escudo USA', [
                'Matt Freese', //251
                'Chris Richards', //252
                'Tim Ream', //253
                'Mark McKenzie', //254
                'Alex Freeman', //255
                'Antonee Robinson', //256
                'Tyler Adams', //257
                'Tanner Tessmann', //258
                'Weston McKenny', //259
                'Christian Roldan', //260
                'Timothy Weah', //261
                'Diego Luna', //262
                'Malik Tillman', //263
                'Christian Pulisic', //264
                'Brenden Aaronson', //265
                'Ricardo Pepi', //266
                'Haji Wright', //267
                'Folarin Balogun', //268
            ])
        },
        {
            id: 'par', name: 'Paraguay', emoji: '🇵🇾', group: 'CONMEBOL', stickers: makeTeam(269, 'Escudo Paraguay', [
                'Roberto Fernandez', //271
                'Orlando Gill', //272
                'Gustavo Gomez', //273
                'Fabián Balbuena', //274
                'Juan José Cáceres', //275
                'Omar Alderete', //276
                'Junior Alonso', //277
                'Mathías Villasanti', //278
                'Diego Gomez', //279
                'Damián Bobadilla', //280
                'Andres Cubas', //281
                'Matias Galarza Fonda', //282
                'Julio Enciso', //283
                'Alejandro Romero Gamarra', //284
                'Miguel Almirón', //285
                'Ramon Sosa', //286
                'Angel Romero', //287
                'Antonio Sanabria', //288
            ])
        },
        {
            id: 'aus', name: 'Australia', emoji: '🇦🇺', group: 'AFC', stickers: makeTeam(289, 'Escudo Australia', [
                'Mathew Ryan', //291
                'Joe Gauci', //292
                'Harry Souttar', //293
                'Alessandro Circati', //294
                'Jordan Bos', //295
                'Aziz Behich', //296
                'Cameron Burgess', //297
                'Lewis Miller', //298
                'Milos Degenek', //299
                'Jackson Irvine', //300
                'Riley McGree', //301
                'Aiden O Neill', //302
                'Connor Metcalfe', //303
                'Patrick Yazbek', //304
                'Craig Goodwin', //305
                'Kusini Yengi', //306
                'Nestory Irankunda', //307
                'Mohamed Touré', //308
            ])
        },
        {
            id: 'tur', name: 'Türkiye', emoji: '🇹🇷', group: 'UEFA', stickers: makeTeam(309, 'Escudo Turkia', [
                'Ugurcan Cakir', //311
                'Mert Muldur', //312
                'Zeki Celik', //313
                'Abdulkerim Bardakci', //314
                'Caglar Soyuncu', //315
                'Merih Demiral', //316
                'Ferdi Kadioglu', //317
                'Kaan Ayhan', //318
                'Ismail Yuksek', //319
                'Hakan Calhanoglu', //320
                'Orkun Kokcu', //321
                'Arda Guler', //322
                'Irfan Can Kahveci', //323
                'Yunus Akgun', //324
                'Can Uzun', //325
                'Baris Alper Yilmaz', //326
                'Kerem Akturkoglu', //327
                'Kenan Yildiz', //328
            ])
        },
        {
            id: 'ger', name: 'Germany', emoji: '🇩🇪', group: 'UEFA', stickers: makeTeam(329, 'Escudo Alemania', [
                'Marc-André ter Stegen', //331
                'Jonathan Tah', //332
                'David Raum', //333
                'Nico Schlotterbeck', //334
                'Antonio Rüdiger', //335
                'Waldemar Anton', //336
                'Ridle Baku', //337
                'Maximilian Mittelstadt', //338
                'Joshua Kimmich', //339
                'Florian Wirtz', //340
                'Felix Nmecha', //341
                'Leon Goretzka', //342
                'Jamal Musiala', //343
                'Serge Gnabry', //344
                'Kai Havertz', //345
                'Leroy Sane', //346
                'Karim Adeyemi', //347
                'Nick Woltemade', //348
            ])
        },
        {
            id: 'cuw', name: 'Curaçao', emoji: '🇨🇼', group: 'CONCACAF', stickers: makeTeam(349, 'Escudo Curacao', [
                'Eloy Room', //351
                'Armando Obispo', //352
                'Sherel Floranus', //353
                'Jurien Gaari', //354
                'Joshua Brenet', //355
                'Roshon Van Eijma', //356
                'Shurandy Sambo', //357
                'Livano Comenencia', //358
                'Godfried Roemeratoe', //359
                'Juninho Bacuna', //360
                'Leandro Bacuna', //361
                'Tahith Chong', //362
                'Kenji Gorre', //363
                'Jearl Margaritha', //364
                'Jurgen Locadia', //365
                'Jeremy Antonisse', //366
                'Gervane Kastaneer', //367
                'Sontje Hansen', //368
            ])
        },
        {
            id: 'civ', name: 'Ivory Coast', emoji: '🇨🇮', group: 'CAF', stickers: makeTeam(369, 'Escudo Costa de Marfil', [
                'Yahia Fofana', //371
                'Ghislain Konan', //372
                'Wilfried Singo', //373
                'Odilon Kossounou', //374
                'Evan Ndicka', //375
                'Willy Boly', //376
                'Emmanuel Agbadou', //377
                'Ousmane Diomande', //378
                'Franck Kessie', //379
                'Seko Fofana', //380
                'Ibrahim Sangare', //381
                'Jean-Philippe Gbamin', //382
                'Amad Diallo', //383
                'Sébastien Haller', //384
                'Simon Adingra', //385
                'Yan Diomande', //386
                'Evann Guessand', //387
                'Oumar Diakite', //388
            ])
        },
        {
            id: 'ecu', name: 'Ecuador', emoji: '🇪🇨', group: 'CONMEBOL', stickers: makeTeam(389, 'Escudo Ecuador', [
                'Hernán Galíndez', //391
                'Gonzalo Valle', //392
                'Piero Hincapié', //393
                'Pervis Estupiñán', //394
                'Willian Pacho', //395
                'Ángelo Preciado', //396
                'Joel Ordóñez', //397
                'Moises Caicedo', //398
                'Alan Franco', //399
                'Kendry Paez', //400
                'Pedro Vite', //401
                'John Yeboah', //402
                'Leonardo Campana', //403
                'Gonzalo Plata', //404
                'Nilson Angulo', //405
                'Alan Minda', //406
                'Kevin Rodriguez', //407
                'Enner Valencia', //408
            ])
        },
        {
            id: 'ned', name: 'Netherlands', emoji: '🇳🇱', group: 'UEFA', stickers: makeTeam(409, 'Escudo Paises Bajos', [
                'Bart Verbruggen', //411
                'Virgil van Dijk', //412
                'Micky van de Ven', //413
                'Jurrien Timber', //414
                'Denzel Dumfries', //415
                'Nathan Aké', //416
                'Jeremie Frimpong', //417
                'Jan Paul van Hecke', //418
                'Tijjani Reijnders', //419
                'Ryan Gravenberch', //420
                'Teun Koopmeiners', //421
                'Frenkie de Jong', //422
                'Xavi Simons', //423
                'Justin Kluivert', //424
                'Memphis Depay', //425
                'Donyell Malen', //426
                'Wout Weghorst', //427
                'Cody Gakpo', //428
            ])
        },
        {
            id: 'jpn', name: 'Japan', emoji: '🇯🇵', group: 'AFC', stickers: makeTeam(429, 'Escudo Japon', [
                'Zion Suzuki', //431
                'Henry Heroki Mochizuki', //432
                'Ayumu Seko', //433
                'Junnosuke Suzuki', //434
                'Shogo Taniguchi', //435
                'Tsuyoshi Watanabe', //436
                'Kaishu Sano', //437
                'Yuki Soma', //438
                'Ao Tanaka', //439
                'Daichi Kamada', //440
                'Takefusa Kubo', //441
                'Ritsu Doan', //442
                'Keito Nakamura', //443
                'Takumi Minamino', //444
                'Shuto Machino', //445
                'Junya Ito', //446
                'Koki Ogawa', //447
                'Ayase Ueda', //448
            ])
        },
        {
            id: 'swe', name: 'Sweden', emoji: '🇸🇪', group: 'UEFA', stickers: makeTeam(449, 'Escudo Suecia', [
                'Victor Johansson', //451
                'Isak Hien', //452
                'Gabriel Gudmundsson', //453
                'Emil Holm', //454
                'Victor Nilsson Lindelöf', //455
                'Gustaf Lagerbielke', //456
                'Lucas Bergvall', //457
                'Hugo Larsson', //458
                'Jesper Karlström', //459
                'Yasin Ayari', //460
                'Mattias Svanberg', //461
                'Daniel Svensson', //462
                'Ken Sema', //463
                'Roony Bardghji', //464
                'Dejan Kulusevski', //465
                'Anthony Elanga', //466
                'Alexander Isak', //467
                'Viktor Gyökeres', //468
            ])
        },
        {
            id: 'tun', name: 'Tunisia', emoji: '🇹🇳', group: 'CAF', stickers: makeTeam(469, 'Escudo Tunes', [
                'Bechir Ben Said', //471
                'Aymen Dahmen', //472
                'Yan Valery', //473
                'Montassar Talbi', //474
                'Yassine Meriah', //475
                'Ali Abdi', //476
                'Dylan Bronn', //477
                'Ellyes Skhiri', //478
                'Aissa Laidouni', //479
                'Ferjani Sassi', //480
                'Mohamed Ali Ben', //481
                'Hannibal Mejbri', //482
                'Elias Achouri', //483
                'Elias Saad', //484
                'Hazem Mastouri', //485
                'Ismael Gharbi', //486
                'Sayfallah Ltaief', //487
                'Naim Sliti', //488
            ])
        },
        {
            id: 'bel', name: 'Belgium', emoji: '🇧🇪', group: 'UEFA', stickers: makeTeam(489, 'Escudo Belgica', [
                'Thibaut Courtois', //491
                'Arthur Theate', //492
                'Timothy Castagne', //493
                'Zeno Debast', //494
                'Brandon Mechele', //495
                'Maxim De Cuyper', //496
                'Thomas Meunier', //497
                'Youri Tielemans', //498
                'Amadou Onana', //499
                'Nicolas Raskin', //500
                'Alexis Saelemaekers', //501
                'Hans Vanaken', //502
                'Kevin De Bruyne', //503
                'Jérémy Doku', //504
                'Charles De Ketelaere', //505
                'Leandro Trossard', //506
                'Loïs Openda', //507
                'Romelu Lukaku', //508
            ])
        },
        {
            id: 'egy', name: 'Egypt', emoji: '🇪🇬', group: 'CAF', stickers: makeTeam(509, 'Escudo Egipto', [
                'Mohamed El Shenawy', //511
                'Mohamed Hany', //512
                'Mohamed Hamdy', //513
                'Yasser Ibrahim', //514
                'Khaled Sobhi', //515
                'Ramy Rabia', //516
                'Hossam Abdelmaguid', //517
                'Ahmed Fatouh', //518
                'Marwan Attia', //519
                'Zizo', //520
                'Hamdy Fathy', //521
                'Mohamed Lasheen', //522
                'Emam Ashour', //523
                'Osama Faisal', //524
                'Mohamed Salah', //525
                'Mostafa Mohamed', //526
                'Trezeguet', //527
                'Omar Marmoush', //528
            ])
        },
        {
            id: 'irn', name: 'Iran', emoji: '🇮🇷', group: 'AFC', stickers: makeTeam(529, 'Escudo Iran', [
                'Alireza Beiranvand', //531
                'Morteza Pouraliganji', //532
                'Ehsan Hajsafi', //533
                'Milad Mohammadi', //534
                'Shojae Khalilzadeh', //535
                'Ramin Rezaeian', //536
                'Hossein Kanaani', //537
                'Sadegh Moharrami', //538
                'Saleh Hardani', //539
                'Saeed Ezatolahi', //540
                'Saman Ghoddos', //541
                'Omid Noorafkan', //542
                'Roozbeh Cheshmi', //543
                'Mohammad Mohebi', //544
                'Sardar Azmoun', //545
                'Mehdi Taremi', //546
                'Alireza Jahanbakhsh', //547
                'Ali Gholizadeh', //548
            ])
        },
        {
            id: 'nzl', name: 'New Zealand', emoji: '🇳🇿', group: 'OFC', stickers: makeTeam(549, 'Escudo Nueva Zelanda', [
                'Max Crocombe', //551
                'Alex Paulsen', //552
                'Michael Boxall', //553
                'Liberato Cacace', //554
                'Tim Payne', //555
                'Tyler Bindon', //556
                'Francis de Vries', //557
                'Finn Surman', //558
                'Joe Bell', //559
                'Sarpreet Singh', //560
                'Ryan Thomas', //561
                'Matthew Garbett', //562
                'Marko Stameni?', //563
                'Ben Old', //564
                'Chris Wood', //565
                'Elijah Just', //566
                'Callum McCowatt', //567
                'Kosta Barbarouses', //568
            ])
        },
        {
            id: 'esp', name: 'Spain', emoji: '🇪🇸', group: 'UEFA', stickers: makeTeam(569, 'Escudo España', [
                'Unai Simon', //571
                'Robin Le Normand', //572
                'Aymeric Laporte', //573
                'Dean Huijsen', //574
                'Pedro Porro', //575
                'Dani Carvajal', //576
                'Marc Cucurella', //577
                'Martín Zubimendi', //578
                'Rodri', //579
                'Pedri', //580
                'Fabian Ruiz', //581
                'Mikel Merino', //582
                'Lamine Yamal', //583
                'Dani Olmo', //584
                'Nico Williams', //585
                'Ferran Torres', //586
                'Álvaro Morata', //587
                'Mikel Oyarzabal', //588
            ])
        },
        {
            id: 'cpv', name: 'Cape Verde', emoji: '🇨🇻', group: 'CAF', stickers: makeTeam(589, 'Escudo Cabo Verde', [
                'Vozinha', //591
                'Logan Costa', //592
                'Pico', //593
                'Diney', //594
                'Steven Moreira', //595
                'Wagner Pina', //596
                'Joao Paulo', //597
                'Yannick Semedo', //598
                'Kevin Pina', //599
                'Patrick Andrade', //600
                'Jamiro Monteiro', //601
                'Deroy Duarte', //602
                'Garry Rodrigues', //603
                'Jovane Cabral', //604
                'Ryan Mendes', //605
                'Dailon Livramento', //606
                'Willy Semedo', //607
                'Bebe', //608
            ])
        },
        {
            id: 'ksa', name: 'Saudi Arabia', emoji: '🇸🇦', group: 'AFC', stickers: makeTeam(609, 'Escudo Arabia Saudi', [
                'Nawaf Alaqidi', //611
                'Abdulrahman Al-Sanbi', //612
                'Saud Abdulhamid', //613
                'Nawaf Bouwashl', //614
                'Jihad Thakri', //615
                'Moteb Al-Harbi', //616
                'Hassan Altambakti', //617
                'Musab Aljuwayr', //618
                'Ziyad Aljohani', //619
                'Abdullah Alkhaibari', //620
                'Nasser Aldawsari', //621
                'Saleh Abu Alshamat', //622
                'Marwan Alsahafi', //623
                'Salem Aldawsari', //624
                'Abdulrahman Al-Aboud', //625
                'Feras Akbrikan', //626
                'Saleh Alshehri', //627
                'Abdullah Al-Hamdan', //628
            ])
        },
        {
            id: 'uru', name: 'Uruguay', emoji: '🇺🇾', group: 'CONMEBOL', stickers: makeTeam(629, 'Escudo Uruguay', [
                'Sergio Rochet', //631
                'Santiago Mele', //632
                'Ronald Araujo', //633
                'José María Giménez', //634
                'Sebastian Caceres', //635
                'Mathias Olivera', //636
                'Guillermo Varela', //637
                'Nahitan Nandez', //638
                'Federico Valverde', //639
                'Giorgian De Arrascaeta', //640
                'Rodrigo Bentancur', //641
                'Manuel Ugarte', //642
                'Nicolás de la Cruz', //643
                'Maxi Araujo', //644
                'Darwin Núñez', //645
                'Federico Viñas', //646
                'Rodrigo Aguirre', //647
                'Facundo Pellistri', //648
            ])
        },
        {
            id: 'fra', name: 'France', emoji: '🇫🇷', group: 'UEFA', stickers: makeTeam(649, 'Escudo Francia', [
                'Mike Maignan', //651
                'Theo Hernandez', //652
                'William Saliba', //653
                'Jules Kounde', //654
                'Ibrahima Konate', //655
                'Dayot Upamecano', //656
                'Lucas Digne', //657
                'Aurélien Tchouaméni', //658
                'Eduardo Camavinga', //659
                'Manu Kone', //660
                'Adrien Rabiot', //661
                'Michael Olise', //662
                'Ousmane Dembele', //663
                'Bradley Barcola', //664
                'Désiré Doué', //665
                'Kingsley Coman', //666
                'Hugo Ekitike', //667
                'Kylian Mbappe', //668
            ])
        },
        {
            id: 'sen', name: 'Senegal', emoji: '🇸🇳', group: 'CAF', stickers: makeTeam(669, 'Escudo Senegal', [
                'Édouard Mendy', //671
                'Yehvann Diouf', //672
                'Moussa Niakhaté', //673
                'Abdoulaye Seck', //674
                'Ismail Jakobs', //675
                'El Hadji Malick Diouf', //676
                'Kalidou Koulibaly', //677
                'Idrissa Gana Gueye', //678
                'Pape Matar Sarr', //679
                'Pape Gueye', //680
                'Habib Diarra', //681
                'Lamine Camara', //682
                'Sadio Mane', //683
                'Ismaïla Sarr', //684
                'Boulaye Dia', //685
                'Iliman Ndiaye', //686
                'Nicolas Jackson', //687
                'Krepin Diatta', //688
            ])
        },
        {
            id: 'irq', name: 'Iraq', emoji: '🇮🇶', group: 'AFC', stickers: makeTeam(689, 'Escudo Iraq', [
                'Jalal Hassan', //691
                'Rebin Sulaka', //692
                'Hussein Ali', //693
                'Akam Hashem', //694
                'Merchas Doski', //695
                'Zaid Tahseen', //696
                'Manaf Younis', //697
                'Zidane Iqbal', //698
                'Amir Al-Ammari', //699
                'Ibrahim Bavesh', //700
                'Ali Jasim', //701
                'Youssef Amyn', //702
                'Aimar Sher', //703
                'Marko Farji', //704
                'Osama Rashid', //705
                'Ali Al-Hamadi', //706
                'Aymen Hussein', //707
                'Mohanad Ali', //708
            ])
        },
        {
            id: 'nor', name: 'Norway', emoji: '🇳🇴', group: 'UEFA', stickers: makeTeam(709, 'Escudo Noruega', [
                'Orjan Nyland', //711
                'Julian Ryerson', //712
                'Leo Ostigård', //713
                'Kristoffer Vassbakk Ajer', //714
                'Marcus Holmgren Pedersen', //715
                'David Møller Wolfe', //716
                'Torbjørn Heggem', //717
                'Morten Thorsby', //718
                'Martin Ødegaard', //719
                'Sander Berge', //720
                'Andreas Schjelderup', //721
                'Patrick Berg', //722
                'Erling Haaland', //723
                'Alexander Sørloth', //724
                'Aron Dønnum', //725
                'Jorgen Strand Larsen', //726
                'Antonio Nusa', //727
                'Oscar Bobb', //728
            ])
        },
        {
            id: 'arg', name: 'Argentina', emoji: '🇦🇷', group: 'CONMEBOL', stickers: makeTeam(729, 'Escudo Argentina', [
                'Emiliano Martinez', //731
                'Nahuel Molina', //732
                'Cristian Romero', //733
                'Nicolas Otamendi', //734
                'Nicolas Tagliafico', //735
                'Leonardo Balerdi', //736
                'Enzo Fernandez', //737
                'Alexis Mac Allister', //738
                'Rodrigo De Paul', //739
                'Exequiel Palacios', //740
                'Leandro Paredes', //741
                'Nico Paz', //742
                'Franco Mastantuono', //743
                'Nico Gonzalez', //744
                'Lionel Messi', //745
                'Lautaro Martinez', //746
                'Julian Alvarez', //747
                'Giuliano Simeone', //748
            ])
        },
        {
            id: 'alg', name: 'Algeria', emoji: '🇩🇿', group: 'CAF', stickers: makeTeam(749, 'Escudo Argelia', [
                'Alexis Guendouz', //751
                'Ramy Bensebaini', //752
                'Youcef Atal', //753
                'Rayan Aït-Nouri', //754
                'Mohamed Amine Tougai', //755
                'Aïssa Mandi', //756
                'Ismael Bennacer', //757
                'Houssem Aouar', //758
                'Hicham Boudaoui', //759
                'Ramiz Zerrouki', //760
                'Nabil Bentaleb', //761
                'Farés Chaibi', //762
                'Riyad Mahrez', //763
                'Said Benrahma', //764
                'Anis Hadj Moussa', //765
                'Amine Gouiri', //766
                'Baghdad Bounedjah', //767
                'Mohammed Amoura', //768
            ])
        },
        {
            id: 'aut', name: 'Austria', emoji: '🇦🇹', group: 'UEFA', stickers: makeTeam(769, 'Escudo Audtria', [
                'Alexander Schlager', //771
                'Patrick Pentz', //772
                'David Alaba', //773
                'Kevin Danso', //774
                'Philipp Lienhart', //775
                'Stefan Posch', //776
                'Phillipp Mwene', //777
                'Alexander Prass', //778
                'Xaver Schlager', //779
                'Marcel Sabitzer', //780
                'Konrad Laimer', //781
                'Florian Grillitsch', //782
                'Nicolas Seiwald', //783
                'Romano Schmid', //784
                'Patrick Wimmer', //785
                'Christoph Baumgartner', //786
                'Michael Gregoritsch', //787
                'Marko Arnautovi?', //788
            ])
        },
        {
            id: 'jor', name: 'Jordan', emoji: '🇯🇴', group: 'AFC', stickers: makeTeam(789, 'Escudo Jordania', [
                'Yazeed Abulaila', //791
                'Ihsan Haddad', //792
                'Mohammad Abu Hashish', //793
                'Yazan Al-Arab', //794
                'Abdallah Nasib', //795
                'Saleem Obaid', //796
                'Mohammad Abualnadi', //797
                'Ibrahim Saadeh', //798
                'Nizar Al-Rashdan', //799
                'Noor Al-Rawabdeh', //800
                'Mohannad Abu Taha', //801
                'Amer Jamous', //802
                'Musa Al-Taamari', //803
                'Yazan Al-Naimat', //804
                'Mahmoud Al-Mardi', //805
                'Ali Olwan', //806
                'Mohammad Abu Zrayq', //807
                'Ibrahim Sabra', //808
            ])
        },
        {
            id: 'por', name: 'Portugal', emoji: '🇵🇹', group: 'UEFA', stickers: makeTeam(809, 'Escudo Portugal', [
                'Diogo Costa', //811
                'José Sá', //812
                'Ruben Dias', //813
                'João Cancelo', //814
                'Diogo Dalot', //815
                'Nuno Mendes', //816
                'Gonçalo Inácio', //817
                'Bernardo Silva', //818
                'Bruno Fernandes', //819
                'Ruben Neves', //820
                'Vitinha', //821
                'João Neves', //822
                'Cristiano Ronaldo', //823
                'Francisco Trincao', //824
                'João Felix', //825
                'Gonçalo Ramos', //826
                'Pedro Neto', //827
                'Rafael Leão', //828
            ])
        },
        {
            id: 'cod', name: 'Congo DR', emoji: '🇨🇩', group: 'CAF', stickers: makeTeam(829, 'Escudo Republica Congo', [
                'Lionel Mpasi-Nzau', //831
                'Aaron Wan-Bissaka', //832
                'Axel Tuanzebe', //833
                'Arthur Masuaku', //834
                'Chancel Mbemba', //835
                'Joris Kayembe', //836
                'Charles Pickel', //837
                'Ngal\'ayel Mukau', //838
                'Edo Kayembe', //839
                'Samuel Moutoussamy', //840
                'Noah Sadiki', //841
                'Théo Bongonda', //842
                'Meschak Elia', //843
                'Yoane Wissa', //844
                'Brian Cipenga', //845
                'Fiston Mayele', //846
                'Cédric Bakambu', //847
                'Nathanaël Mbuku', //848
            ])
        },
        {
            id: 'uzb', name: 'Uzbekistan', emoji: '🇺🇿', group: 'AFC', stickers: makeTeam(849, 'Escudo Uzbekistan', [
                'Utkir Yusupov', //851
                'Farrukh Savfiev', //852
                'Sherzod Nasrullaev', //853
                'Umar Eshmurodov', //854
                'Husniddin Aliqulov', //855
                'Rustamjon Ashurmatov', //856
                'Khojiakbar Alijonov', //857
                'Abdukodir Khusanov', //858
                'Odiljon Hamrobekov', //859
                'Otabek Shukurov', //860
                'Jamshid Iskanderov', //861
                'Azizbek Turgunboev', //862
                'Khojimat Erkinov', //863
                'Eldor Shomurodov', //864
                'Oston Urunov', //865
                'Jaloliddin Masharipov', //866
                'Igor Sergeev', //867
                'Abbosbek Fayzullaev', //868
            ])
        },
        {
            id: 'col', name: 'Colombia', emoji: '🇨🇴', group: 'CONMEBOL', stickers: makeTeam(869, 'Escudo Colombia', [
                'Camilo Vargas', //871
                'David Ospina', //872
                'Dávinson Sánchez', //873
                'Yerry Mina', //874
                'Daniel Munoz', //875
                'Johan Mojica', //876
                'Jhon Lucumí', //877
                'Santiago Arias', //878
                'Jefferson Lerma', //879
                'Kevin Castaño', //880
                'Richard Rios', //881
                'James Rodriguez', //882
                'Juan Fernando Quintero', //883
                'Jorge Carrascal', //884
                'Jhon Arias', //885
                'Jhon Cordova', //886
                'Luis Suarez', //887
                'Luis Diaz', //888
            ])
        },
        {
            id: 'eng', name: 'England', emoji: '🏴', group: 'UEFA', stickers: makeTeam(889, 'Escudo Inglaterra', [
                'Jordan Pickford', //891
                'John Stones', //892
                'Marc Guéhi', //893
                'Ezri Konsa', //894
                'Trent Alexander-Arnold', //895
                'Reece James', //896
                'Dan Burn', //897
                'Jordan Henderson', //898
                'Declan Rice', //899
                'Jude Bellingham', //900
                'Cole Palmer', //901
                'Morgan Rogers', //902
                'Anthony Gordon', //903
                'Phil Foden', //904
                'Bukayo Saka', //905
                'Harry Kane', //906
                'Marcus Rashford', //907
                'Ollie Watkins', //908
            ])
        },
        {
            id: 'cro', name: 'Croatia', emoji: '🇭🇷', group: 'UEFA', stickers: makeTeam(909, 'Escudo Croacia', [
                'Dominik Livakovi', //911
                'Duje Caleta-Car', //912
                'Josko Gvardiol', //913
                'Josip Staniki?', //914
                'Luka Vuakovi?', //915
                'Josip Sutalo', //916
                'Kristijan Jakic', //917
                'Luka Modri', //918
                'Mateo Kovacic', //919
                'Martin Baturina', //920
                'Lovro Majer', //921
                'Mario Pasalic', //922
                'Petar Sucic', //923
                'Ivan Periki?', //924
                'Marco Pasalic', //925
                'Ante Budimir', //926
                'Andrej Kramari?', //927
                'Franjo Ivanovic', //928
            ])
        },
        {
            id: 'gha', name: 'Ghana', emoji: '🇬🇭', group: 'CAF', stickers: makeTeam(929, 'Escudo Ghana', [
                'Lawrence Ati Zigi', //931
                'Tariq Lamptey', //932
                'Mohammed Salisu', //933
                'Alidu Seidu', //934
                'Alexander Djiku', //935
                'Gideon Mensah', //936
                'Caleb Yirenkyi', //937
                'Abdul Issahaku Fatawu', //938
                'Thomas Partey', //939
                'Salis Abdul Samed', //940
                'Kamaldeen Sulemana', //941
                'Mohammed Kudus', //942
                'Inaki Williams', //943
                'Jordan Ayew', //944
                'André Ayew', //945
                'Joseph Paintsil', //946
                'Osman Bukari', //947
                'Antoine Semenyo', //948
            ])
        },
        {
            id: 'pan', name: 'Panama', emoji: '🇵🇦', group: 'CONCACAF', stickers: makeTeam(949, 'Escudo Panama', [
                'Orlando Mosquera', //951
                'Luis Mejia', //952
                'Fidel Escobar', //953
                'Andres Andrade', //954
                'Michael Amir Murillo', //955
                'Eric Davis', //956
                'Jose Cordoba', //957
                'Cesar Blackman', //958
                'Cristian Martinez', //959
                'Aníbal Godoy', //960
                'Adalberto Carrasquilla', //961
                'Édgar Bárcenas', //962
                'Carlos Harvey', //963
                'Ismael Díaz', //964
                'Jose Fajardo', //965
                'Cecilio Waterman', //966
                'Jose Luiz Rodriguez', //967
                'Alberto Quintero', //968
            ])
        },


        // ── MUSEO FIFA ─────────────────────────────────
        {
            id: 'museo',
            name: 'Museo FIFA',
            emoji: '🏟️',
            type: 'special',
            stickers: [
                { n: 969, label: 'FIFA World Cup History', type: 'special', shortLabel: 'Italy 1934' },
                { n: 970, label: 'FIFA World Cup History', type: 'special', shortLabel: 'Uruguay 1950' },
                { n: 971, label: 'FIFA World Cup History', type: 'special', shortLabel: 'West Germany 1954' },
                { n: 972, label: 'FIFA World Cup History', type: 'special', shortLabel: 'Brazil 1962' },
                { n: 973, label: 'FIFA World Cup History', type: 'special', shortLabel: 'West Germany 1974' },
                { n: 974, label: 'FIFA World Cup History', type: 'special', shortLabel: 'Argentina 1986' },
                { n: 975, label: 'FIFA World Cup History', type: 'special', shortLabel: 'Brazil 1994' },
                { n: 976, label: 'FIFA World Cup History', type: 'special', shortLabel: 'Brazil 2002' },
                { n: 977, label: 'FIFA World Cup History', type: 'special', shortLabel: 'Italy 2006' },
                { n: 978, label: 'FIFA World Cup History', type: 'special', shortLabel: 'Germany 2014' },
                { n: 979, label: 'FIFA World Cup History', type: 'special', shortLabel: 'Argentina 2022' },
            ]
        },

        // ── EXTRA STICKERS (EX-01 ... EX-80) — no tienen número de álbum ─────
        {
            id: 'extra',
            name: 'Extra Stickers',
            emoji: '✨',
            type: 'extra',
            stickers: [
                // Versión BASE (20 jugadores)
                { n: 980, label: 'Lionel Messi — Extra Base', type: 'extra_base', shortLabel: 'Messi BASE' },
                { n: 981, label: 'Cristiano Ronaldo — Extra Base', type: 'extra_base', shortLabel: 'CR7 BASE' },
                { n: 982, label: 'Kylian Mbappé — Extra Base', type: 'extra_base', shortLabel: 'Mbappé BASE' },
                { n: 983, label: 'Vinícius Jr. — Extra Base', type: 'extra_base', shortLabel: 'Vini BASE' },
                { n: 984, label: 'Jude Bellingham — Extra Base', type: 'extra_base', shortLabel: 'Bellingham BASE' },
                { n: 985, label: 'Erling Haaland — Extra Base', type: 'extra_base', shortLabel: 'Haaland BASE' },
                { n: 986, label: 'Mohamed Salah — Extra Base', type: 'extra_base', shortLabel: 'Salah BASE' },
                { n: 987, label: 'Luka Modrić — Extra Base', type: 'extra_base', shortLabel: 'Modrić BASE' },
                { n: 988, label: 'Harry Kane — Extra Base', type: 'extra_base', shortLabel: 'Kane BASE' },
                { n: 989, label: 'Neymar Jr. — Extra Base', type: 'extra_base', shortLabel: 'Neymar BASE' },
                { n: 990, label: 'Robert Lewandowski — Extra Base', type: 'extra_base', shortLabel: 'Lewandowski BASE' },
                { n: 991, label: 'Christian Pulisic — Extra Base', type: 'extra_base', shortLabel: 'Pulisic BASE' },
                { n: 992, label: 'Luis Díaz — Extra Base', type: 'extra_base', shortLabel: 'Luis Díaz BASE' },
                { n: 993, label: 'Santiago Giménez — Extra Base', type: 'extra_base', shortLabel: 'Giménez BASE' },
                { n: 994, label: 'Darwin Núñez — Extra Base', type: 'extra_base', shortLabel: 'Núñez BASE' },
                { n: 995, label: 'Federico Valverde — Extra Base', type: 'extra_base', shortLabel: 'Valverde BASE' },
                { n: 996, label: 'Moisés Caicedo — Extra Base', type: 'extra_base', shortLabel: 'Caicedo BASE' },
                { n: 997, label: 'Lamine Yamal — Extra Base', type: 'extra_base', shortLabel: 'Yamal BASE' },
                { n: 998, label: 'Florian Wirtz — Extra Base', type: 'extra_base', shortLabel: 'Wirtz BASE' },
                { n: 999, label: 'Jamal Musiala — Extra Base', type: 'extra_base', shortLabel: 'Musiala BASE' },
                // Versión BRONCE
                { n: 1000, label: 'Lionel Messi — Extra Bronce', type: 'extra_bronze', shortLabel: 'Messi BRZ' },
                { n: 1001, label: 'Cristiano Ronaldo — Extra Bronce', type: 'extra_bronze', shortLabel: 'CR7 BRZ' },
                { n: 1002, label: 'Kylian Mbappé — Extra Bronce', type: 'extra_bronze', shortLabel: 'Mbappé BRZ' },
                { n: 1003, label: 'Vinícius Jr. — Extra Bronce', type: 'extra_bronze', shortLabel: 'Vini BRZ' },
                { n: 1004, label: 'Jude Bellingham — Extra Bronce', type: 'extra_bronze', shortLabel: 'Bellingham BRZ' },
                { n: 1005, label: 'Erling Haaland — Extra Bronce', type: 'extra_bronze', shortLabel: 'Haaland BRZ' },
                { n: 1006, label: 'Mohamed Salah — Extra Bronce', type: 'extra_bronze', shortLabel: 'Salah BRZ' },
                { n: 1007, label: 'Luka Modrić — Extra Bronce', type: 'extra_bronze', shortLabel: 'Modrić BRZ' },
                { n: 1008, label: 'Harry Kane — Extra Bronce', type: 'extra_bronze', shortLabel: 'Kane BRZ' },
                { n: 1009, label: 'Neymar Jr. — Extra Bronce', type: 'extra_bronze', shortLabel: 'Neymar BRZ' },
                { n: 1010, label: 'Robert Lewandowski — Extra Bronce', type: 'extra_bronze', shortLabel: 'Lewandowski BRZ' },
                { n: 1011, label: 'Christian Pulisic — Extra Bronce', type: 'extra_bronze', shortLabel: 'Pulisic BRZ' },
                { n: 1012, label: 'Luis Díaz — Extra Bronce', type: 'extra_bronze', shortLabel: 'Luis Díaz BRZ' },
                { n: 1013, label: 'Santiago Giménez — Extra Bronce', type: 'extra_bronze', shortLabel: 'Giménez BRZ' },
                { n: 1014, label: 'Darwin Núñez — Extra Bronce', type: 'extra_bronze', shortLabel: 'Núñez BRZ' },
                { n: 1015, label: 'Federico Valverde — Extra Bronce', type: 'extra_bronze', shortLabel: 'Valverde BRZ' },
                { n: 1016, label: 'Moisés Caicedo — Extra Bronce', type: 'extra_bronze', shortLabel: 'Caicedo BRZ' },
                { n: 1017, label: 'Lamine Yamal — Extra Bronce', type: 'extra_bronze', shortLabel: 'Yamal BRZ' },
                { n: 1018, label: 'Florian Wirtz — Extra Bronce', type: 'extra_bronze', shortLabel: 'Wirtz BRZ' },
                { n: 1019, label: 'Jamal Musiala — Extra Bronce', type: 'extra_bronze', shortLabel: 'Musiala BRZ' },
                // Versión PLATA
                { n: 1020, label: 'Lionel Messi — Extra Plata', type: 'extra_silver', shortLabel: 'Messi PLT' },
                { n: 1021, label: 'Cristiano Ronaldo — Extra Plata', type: 'extra_silver', shortLabel: 'CR7 PLT' },
                { n: 1022, label: 'Kylian Mbappé — Extra Plata', type: 'extra_silver', shortLabel: 'Mbappé PLT' },
                { n: 1023, label: 'Vinícius Jr. — Extra Plata', type: 'extra_silver', shortLabel: 'Vini PLT' },
                { n: 1024, label: 'Jude Bellingham — Extra Plata', type: 'extra_silver', shortLabel: 'Bellingham PLT' },
                { n: 1025, label: 'Erling Haaland — Extra Plata', type: 'extra_silver', shortLabel: 'Haaland PLT' },
                { n: 1026, label: 'Mohamed Salah — Extra Plata', type: 'extra_silver', shortLabel: 'Salah PLT' },
                { n: 1027, label: 'Luka Modrić — Extra Plata', type: 'extra_silver', shortLabel: 'Modrić PLT' },
                { n: 1028, label: 'Harry Kane — Extra Plata', type: 'extra_silver', shortLabel: 'Kane PLT' },
                { n: 1029, label: 'Neymar Jr. — Extra Plata', type: 'extra_silver', shortLabel: 'Neymar PLT' },
                { n: 1030, label: 'Robert Lewandowski — Extra Plata', type: 'extra_silver', shortLabel: 'Lewandowski PLT' },
                { n: 1031, label: 'Christian Pulisic — Extra Plata', type: 'extra_silver', shortLabel: 'Pulisic PLT' },
                { n: 1032, label: 'Luis Díaz — Extra Plata', type: 'extra_silver', shortLabel: 'Luis Díaz PLT' },
                { n: 1033, label: 'Santiago Giménez — Extra Plata', type: 'extra_silver', shortLabel: 'Giménez PLT' },
                { n: 1034, label: 'Darwin Núñez — Extra Plata', type: 'extra_silver', shortLabel: 'Núñez PLT' },
                { n: 1035, label: 'Federico Valverde — Extra Plata', type: 'extra_silver', shortLabel: 'Valverde PLT' },
                { n: 1036, label: 'Moisés Caicedo — Extra Plata', type: 'extra_silver', shortLabel: 'Caicedo PLT' },
                { n: 1037, label: 'Lamine Yamal — Extra Plata', type: 'extra_silver', shortLabel: 'Yamal PLT' },
                { n: 1038, label: 'Florian Wirtz — Extra Plata', type: 'extra_silver', shortLabel: 'Wirtz PLT' },
                { n: 1039, label: 'Jamal Musiala — Extra Plata', type: 'extra_silver', shortLabel: 'Musiala PLT' },
                // Versión ORO (las más raras — 1 en 1900 sobres)
                { n: 1040, label: 'Lionel Messi — Extra ORO', type: 'extra_gold', shortLabel: 'Messi ORO' },
                { n: 1041, label: 'Cristiano Ronaldo — Extra ORO', type: 'extra_gold', shortLabel: 'CR7 ORO' },
                { n: 1042, label: 'Kylian Mbappé — Extra ORO', type: 'extra_gold', shortLabel: 'Mbappé ORO' },
                { n: 1043, label: 'Vinícius Jr. — Extra ORO', type: 'extra_gold', shortLabel: 'Vini ORO' },
                { n: 1044, label: 'Jude Bellingham — Extra ORO', type: 'extra_gold', shortLabel: 'Bellingham ORO' },
                { n: 1045, label: 'Erling Haaland — Extra ORO', type: 'extra_gold', shortLabel: 'Haaland ORO' },
                { n: 1046, label: 'Mohamed Salah — Extra ORO', type: 'extra_gold', shortLabel: 'Salah ORO' },
                { n: 1047, label: 'Luka Modrić — Extra ORO', type: 'extra_gold', shortLabel: 'Modrić ORO' },
                { n: 1048, label: 'Harry Kane — Extra ORO', type: 'extra_gold', shortLabel: 'Kane ORO' },
                { n: 1049, label: 'Neymar Jr. — Extra ORO', type: 'extra_gold', shortLabel: 'Neymar ORO' },
                { n: 1050, label: 'Robert Lewandowski — Extra ORO', type: 'extra_gold', shortLabel: 'Lewandowski ORO' },
                { n: 1051, label: 'Christian Pulisic — Extra ORO', type: 'extra_gold', shortLabel: 'Pulisic ORO' },
                { n: 1052, label: 'Luis Díaz — Extra ORO', type: 'extra_gold', shortLabel: 'Luis Díaz ORO' },
                { n: 1053, label: 'Santiago Giménez — Extra ORO', type: 'extra_gold', shortLabel: 'Giménez ORO' },
                { n: 1054, label: 'Darwin Núñez — Extra ORO', type: 'extra_gold', shortLabel: 'Núñez ORO' },
                { n: 1055, label: 'Federico Valverde — Extra ORO', type: 'extra_gold', shortLabel: 'Valverde ORO' },
                { n: 1056, label: 'Moisés Caicedo — Extra ORO', type: 'extra_gold', shortLabel: 'Caicedo ORO' },
                { n: 1057, label: 'Lamine Yamal — Extra ORO', type: 'extra_gold', shortLabel: 'Yamal ORO' },
                { n: 1058, label: 'Florian Wirtz — Extra ORO', type: 'extra_gold', shortLabel: 'Wirtz ORO' },
                { n: 1059, label: 'Jamal Musiala — Extra ORO', type: 'extra_gold', shortLabel: 'Musiala ORO' },
            ]
        },

        // ── COCA-COLA (1081-1094) ─────────────────────────────────────────────
        {
            id: 'coca',
            name: 'Coca-Cola',
            emoji: '🥤',
            type: 'coca',
            stickers: [
                { n: 1081, label: 'Lamine Yamal — Coca-Cola', type: 'coca', shortLabel: 'Yamal CC' },
                { n: 1082, label: 'Joshua Kimmich — Coca-Cola', type: 'coca', shortLabel: 'Kimmich CC' },
                { n: 1083, label: 'Harry Kane — Coca-Cola', type: 'coca', shortLabel: 'Kane CC' },
                { n: 1084, label: 'Santiago Giménez — Coca-Cola', type: 'coca', shortLabel: 'Giménez CC' },
                { n: 1085, label: 'Josko Gvardiol — Coca-Cola', type: 'coca', shortLabel: 'Gvardiol CC' },
                { n: 1086, label: 'Federico Valverde — Coca-Cola', type: 'coca', shortLabel: 'Valverde CC' },
                { n: 1087, label: 'Jefferson Lerma — Coca-Cola', type: 'coca', shortLabel: 'Lerma CC' },
                { n: 1088, label: 'Enner Valencia — Coca-Cola', type: 'coca', shortLabel: 'Valencia CC' },
                { n: 1089, label: 'Gabriel Magalhaes — Coca-Cola', type: 'coca', shortLabel: 'Magalhaes CC' },
                { n: 1090, label: 'Virgil van Dijk — Coca-Cola', type: 'coca', shortLabel: 'van Dijk CC' },
                { n: 1091, label: 'Alphonso Davies — Coca-Cola', type: 'coca', shortLabel: 'Davies CC' },
                { n: 1092, label: 'Emiliano Martínez — Coca-Cola', type: 'coca', shortLabel: 'E. Martínez CC' },
                { n: 1093, label: 'Raúl Jiménez — Coca-Cola', type: 'coca', shortLabel: 'Jiménez CC' },
                { n: 1094, label: 'Lautaro Martínez — Coca-Cola', type: 'coca', shortLabel: 'l. Martínez CC' },

            ]
        }
    ]
}
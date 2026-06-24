// Igbo Language Learning Platform - Curriculum Data

const IGBO_DATA = {
  // 1. THE ONWU ALPHABET (36 Letters)
  alphabet: [
    { letter: 'A', name: 'A', type: 'vowel', group: 'light', example: 'Akpa', translation: 'Bag', tone: 'H-H', tonePattern: [1, 1], description: 'Pronounced like "a" in father.' },
    { letter: 'B', name: 'Bị', type: 'consonant', example: 'Bia', translation: 'Come', tone: 'H', tonePattern: [1], description: 'Pronounced like "b" in boy.' },
    { letter: 'Ch', name: 'Chị', type: 'digraph', example: 'Chineke', translation: 'God', tone: 'L-H-H', tonePattern: [-1, 1, 1], description: 'Pronounced like "ch" in chair.' },
    { letter: 'D', name: 'Dị', type: 'consonant', example: 'Dike', translation: 'Hero / Strong man', tone: 'H-H', tonePattern: [1, 1], description: 'Pronounced like "d" in dog.' },
    { letter: 'E', name: 'E', type: 'vowel', group: 'heavy', example: 'Ewu', translation: 'Goat', tone: 'H-L', tonePattern: [1, -1], description: 'Pronounced like "e" in met.' },
    { letter: 'F', name: 'Fị', type: 'consonant', example: 'Fese', translation: 'Fly', tone: 'H-H', tonePattern: [1, 1], description: 'Pronounced like "f" in fish.' },
    { letter: 'G', name: 'Gị', type: 'consonant', example: 'Gaba', translation: 'Go / Move on', tone: 'H-H', tonePattern: [1, 1], description: 'Pronounced like "g" in go.' },
    { letter: 'Gb', name: 'Gbị', type: 'digraph', example: 'Gbaa', translation: 'Run / Shoot', tone: 'L-L', tonePattern: [-1, -1], description: 'An implosive B sound, pronounced by drawing air inwards slightly.' },
    { letter: 'Gh', name: 'Ghị', type: 'digraph', example: 'Ghari', translation: 'Turn / Confuse', tone: 'H-H', tonePattern: [1, 1], description: 'A voiced velar fricative, similar to the French "r" or Arabic "Ghayn".' },
    { letter: 'Gw', name: 'Gwị', type: 'digraph', example: 'Gwa', translation: 'Tell', tone: 'H', tonePattern: [1], description: 'Pronounced like "gw" in Gwendolyn.' },
    { letter: 'H', name: 'Hị', type: 'consonant', example: 'Ha', translation: 'They', tone: 'H', tonePattern: [1], description: 'Pronounced like "h" in house.' },
    { letter: 'I', name: 'I', type: 'vowel', group: 'heavy', example: 'Ite', translation: 'Pot', tone: 'H-L', tonePattern: [1, -1], description: 'Pronounced like "ee" in meet.' },
    { letter: 'Ị', name: 'Ị', type: 'vowel', group: 'light', example: 'Ịsa', translation: 'To wash', tone: 'L-H', tonePattern: [-1, 1], description: 'Pronounced like "i" in bit. Slipped lower than I.' },
    { letter: 'J', name: 'Jị', type: 'consonant', example: 'Ji', translation: 'Yam', tone: 'H', tonePattern: [1], description: 'Pronounced like "j" in joy.' },
    { letter: 'K', name: 'Kị', type: 'consonant', example: 'Kedu', translation: 'How are you?', tone: 'H-L', tonePattern: [1, -1], description: 'Pronounced like "k" in king.' },
    { letter: 'Kp', name: 'Kpị', type: 'digraph', example: 'Kpaa', translation: 'Discuss / Weave', tone: 'L-L', tonePattern: [-1, -1], description: 'An implosive P sound, produced by closing lips and releasing inwards.' },
    { letter: 'Kw', name: 'Kwị', type: 'digraph', example: 'Kwu', translation: 'Speak', tone: 'H', tonePattern: [1], description: 'Pronounced like "qu" in quick.' },
    { letter: 'L', name: 'Lị', type: 'consonant', example: 'Lawa', translation: 'Depart', tone: 'H-H', tonePattern: [1, 1], description: 'Pronounced like "l" in love.' },
    { letter: 'M', name: 'Mị / M', type: 'consonant', example: 'Mba', translation: 'No / Country', tone: 'H-L', tonePattern: [1, -1], description: 'Pronounced like "m" in mother. Can also be a syllabic nasal.' },
    { letter: 'N', name: 'Nị / N', type: 'consonant', example: 'Nna', translation: 'Father', tone: 'L-H', tonePattern: [-1, 1], description: 'Pronounced like "n" in name. Can also be a syllabic nasal.' },
    { letter: 'Ñ', name: 'Ñị', type: 'consonant', example: 'Ñụọ', translation: 'Drink', tone: 'L-L', tonePattern: [-1, -1], description: 'Pronounced like "ng" in sing.' },
    { letter: 'Nw', name: 'Nwị', type: 'digraph', example: 'Nwa', translation: 'Child', tone: 'H', tonePattern: [1], description: 'Pronounced like "nw" in Gwyn.' },
    { letter: 'Ny', name: 'Nyị', type: 'digraph', example: 'Nyem', translation: 'Give me', tone: 'H-L', tonePattern: [1, -1], description: 'Pronounced like "ny" in canyon.' },
    { letter: 'O', name: 'O', type: 'vowel', group: 'heavy', example: 'Ofe', translation: 'Soup', tone: 'H-L', tonePattern: [1, -1], description: 'Pronounced like "o" in open.' },
    { letter: 'Ọ', name: 'Ọ', type: 'vowel', group: 'light', example: 'Ọnụ', translation: 'Mouth / Price', tone: 'L-H', tonePattern: [-1, 1], description: 'Pronounced like "o" in hot or "aw" in saw.' },
    { letter: 'P', name: 'Pị', type: 'consonant', example: 'Pụọ', translation: 'Go out', tone: 'L-L', tonePattern: [-1, -1], description: 'Pronounced like "p" in pen.' },
    { letter: 'R', name: 'Rị', type: 'consonant', example: 'Rie', translation: 'Eat', tone: 'H-H', tonePattern: [1, 1], description: 'Slightly rolled, like "r" in Spanish.' },
    { letter: 'S', name: 'Sị', type: 'consonant', example: 'Siri', translation: 'Cook / Tough', tone: 'H-H', tonePattern: [1, 1], description: 'Pronounced like "s" in sun.' },
    { letter: 'Sh', name: 'Shị', type: 'digraph', example: 'Shịị', translation: 'Hissing sound', tone: 'H-H', tonePattern: [1, 1], description: 'Pronounced like "sh" in shoe. (Rare, mostly in dialects)' },
    { letter: 'T', name: 'Tị', type: 'consonant', example: 'Tafere', translation: 'Throw away', tone: 'H-H-H', tonePattern: [1, 1, 1], description: 'Pronounced like "t" in tea.' },
    { letter: 'U', name: 'U', type: 'vowel', group: 'heavy', example: 'Ubi', translation: 'Farm', tone: 'H-L', tonePattern: [1, -1], description: 'Pronounced like "oo" in boot.' },
    { letter: 'Ụ', name: 'Ụ', type: 'vowel', group: 'light', example: 'Ụlọ', translation: 'House', tone: 'L-H', tonePattern: [-1, 1], description: 'Pronounced like "u" in put. A lighter, relaxed version of U.' },
    { letter: 'V', name: 'Vị', type: 'consonant', example: 'Voti', translation: 'Vote', tone: 'H-H', tonePattern: [1, 1], description: 'Pronounced like "v" in vase. (Mostly used in loan words)' },
    { letter: 'W', name: 'Wị', type: 'consonant', example: 'Weta', translation: 'Bring', tone: 'H-H', tonePattern: [1, 1], description: 'Pronounced like "w" in wet.' },
    { letter: 'Y', name: 'Yị', type: 'consonant', example: 'Yaa', translation: 'Yaw / Snub', tone: 'L-L', tonePattern: [-1, -1], description: 'Pronounced like "y" in yes.' },
    { letter: 'Z', name: 'Zị', type: 'consonant', example: 'Zụọ', translation: 'Buy / Train', tone: 'L-L', tonePattern: [-1, -1], description: 'Pronounced like "z" in zoo.' }
  ],

  // 2. CURRICULUM LEVELS AND LESSONS
  levels: [
    {
      id: 'level-1',
      title: 'Level 1: Foundations (Mmalite)',
      shortTitle: 'Foundations',
      description: 'Learn the basic structure of the Igbo language: tone marks, vowel harmony, and initial greetings.',
      lessons: [
        {
          id: 'lesson-1-1',
          title: 'Vowels & Vowel Harmony',
          description: 'Learn the 8 vowels of Igbo and the rules governing how they mix in words.',
          content: `
            <h3>The Vowel System</h3>
            <p>Igbo has 8 vowels divided into two groups: <strong>Heavy (Narrow/Upper)</strong> and <strong>Light (Wide/Lower)</strong>. In standard Igbo spelling, light vowels are usually distinguished by a dot underneath (ụ, ọ, ị, ạ is written as normal A).</p>
            
            <div class="harmony-table-container">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Group</th>
                    <th>Vowels</th>
                    <th>Example Word</th>
                    <th>Pronunciation Tip</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="heavy-row">
                    <td><strong>Heavy Group (Aka Ekpe)</strong></td>
                    <td>a, e, i, o, u</td>
                    <td>Ewu (Goat), Ite (Pot)</td>
                    <td>Pronounced with a forward tongue position.</td>
                  </tr>
                  <tr class="light-row">
                    <td><strong>Light Group (Aka Nni)</strong></td>
                    <td>a, ọ, ị, ụ</td>
                    <td>Ụlọ (House), Ịsa (To wash)</td>
                    <td>Pronounced with a retracted tongue root. (A acts as neutral/light here).</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p class="warning-box">
              <strong>Vowel Harmony Rule:</strong> In Igbo, vowels in a single word generally come from the <em>same group</em>. For instance, the word <strong>"ụtụ"</strong> (tax) uses light vowels (ụ, ụ), while <strong>"ite"</strong> (pot) uses heavy vowels (i, e). They rarely mix in native words!
            </p>
          `,
          vocabulary: [
            { word: 'Akpa', translation: 'Bag / Pocket', tonePattern: [1, 1], phonetics: 'áh-kpáh', type: 'Noun' },
            { word: 'Ewu', translation: 'Goat', tonePattern: [1, -1], phonetics: 'é-wù', type: 'Noun' },
            { word: 'Ite', translation: 'Pot', tonePattern: [1, -1], phonetics: 'é-tè', type: 'Noun' },
            { word: 'Ụlọ', translation: 'House / Building', tonePattern: [-1, 1], phonetics: 'ù-lɔ́', type: 'Noun' }
          ]
        },
        {
          id: 'lesson-1-2',
          title: 'Understanding Tones (Ụda Olu)',
          description: 'Master the core tone system: High, Low, and Downstep. Igbo words change meanings based on tone!',
          content: `
            <h3>Why Tones Matter</h3>
            <p>Igbo is a tonal language. The pitch of your voice determines the meaning of a word. There are three key tones in Igbo:</p>
            <ul>
              <li><strong>High Tone (◌́ - Ụda elu):</strong> Pronounced with a high pitch, like asking a question. Written with an acute accent.</li>
              <li><strong>Low Tone (◌̀ - Ụda ala):</strong> Pronounced with a low pitch, like a flat declaration. Written with a grave accent.</li>
              <li><strong>Downstep (◌̄ - Ụda nso):</strong> A high tone that is stepped down slightly after another high tone. Written with a macron.</li>
            </ul>

            <div class="tone-demo-box">
              <h4>The Famous Example: "Oke"</h4>
              <p>Depending on how you pitch the syllables, the spelling "oke" has vastly different meanings:</p>
              <div class="word-card-grid">
                <div class="word-mini-card">
                  <span class="vocab-word">Óké</span>
                  <span class="vocab-tone">High-High [H-H]</span>
                  <span class="vocab-translation">Rat / Rodent</span>
                </div>
                <div class="word-mini-card">
                  <span class="vocab-word">Òkè</span>
                  <span class="vocab-tone">Low-Low [L-L]</span>
                  <span class="vocab-translation">Share / Portion</span>
                </div>
                <div class="word-mini-card">
                  <span class="vocab-word">Òké</span>
                  <span class="vocab-tone">Low-High [L-H]</span>
                  <span class="vocab-translation">Boundary / Limit</span>
                </div>
                <div class="word-mini-card">
                  <span class="vocab-word">Ókè</span>
                  <span class="vocab-tone">High-Low [H-L]</span>
                  <span class="vocab-translation">Male (e.g. Ókè ewu - Male goat)</span>
                </div>
              </div>
            </div>
          `,
          vocabulary: [
            { word: 'Óké', translation: 'Rat', tonePattern: [1, 1], phonetics: 'ó-ké', type: 'Noun' },
            { word: 'Òkè', translation: 'Share / Portion', tonePattern: [-1, -1], phonetics: 'ò-kè', type: 'Noun' },
            { word: 'Òké', translation: 'Boundary', tonePattern: [-1, 1], phonetics: 'ò-ké', type: 'Noun' },
            { word: 'Ókè', translation: 'Male', tonePattern: [1, -1], phonetics: 'ó-kè', type: 'Noun' }
          ]
        },
        {
          id: 'lesson-1-3',
          title: 'Basic Greetings (Ekele)',
          description: 'Learn how to greet elders and peers in Igbo culture.',
          content: `
            <h3>Cultural Greeting Practices</h3>
            <p>Igbo people value greetings highly. Greeting is a sign of respect and home training. There are respectful prefixes used when addressing elders:</p>
            <ul>
              <li><strong>Ndeewo:</strong> A general greeting meaning "welcome" or "thank you". Used to show respect.</li>
              <li><strong>Kedu:</strong> Literally "How is it?" or "How are you?". Mostly informal.</li>
              <li><strong>Ịbọla chị:</strong> "Have you woken up?" (Good morning). Very traditional.</li>
            </ul>
            <p>Let's practice the vocabulary items below and listen to their tones.</p>
          `,
          vocabulary: [
            { word: 'Kedu', translation: 'How are you? / Hello', tonePattern: [1, -1], phonetics: 'ké-dù', type: 'Greeting' },
            { word: 'O dị mma', translation: 'I am fine / It is good', tonePattern: [1, -1, 1, 1], phonetics: 'ó-dì-mmá', type: 'Phrase' },
            { word: 'Ndeewo', translation: 'Greetings / Well done', tonePattern: [1, 1, -1], phonetics: 'ndé-é-wò', type: 'Greeting' },
            { word: 'Ịbọla chị', translation: 'Good morning (lit. Have you woken?)', tonePattern: [-1, -1, 1], phonetics: 'ị̀-bɔ̀-lá-chị́', type: 'Greeting' },
            { word: 'Ka ọ dị', translation: 'Goodbye (lit. Let it be)', tonePattern: [1, -1, -1], phonetics: 'ká-ɔ̀-dì̀', type: 'Greeting' }
          ]
        }
      ]
    },
    {
      id: 'level-2',
      title: 'Level 2: Everyday Conversations (Mkparịta Ụka)',
      shortTitle: 'Conversations',
      description: 'Get practical! Count numbers, introduce yourself, and navigate an Igbo marketplace.',
      lessons: [
        {
          id: 'lesson-2-1',
          title: 'Numbers & Counting (Ọnụọgụ)',
          description: 'Learn how to count from 1 to 20 and structure basic amounts.',
          content: `
            <h3>Igbo Counting Base System</h3>
            <p>The numbers from 1 to 10 are the core building blocks. Numbers from 11 onwards are created using addition structures, utilizing the linking word <strong>"na"</strong> (and/plus) combined with ten <strong>"iri"</strong>.</p>
            
            <div class="harmony-table-container">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Number</th>
                    <th>Igbo Word</th>
                    <th>Number</th>
                    <th>Igbo Word</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td><strong>Otu</strong></td>
                    <td>6</td>
                    <td><strong>Isii</strong></td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td><strong>Abụọ</strong></td>
                    <td>7</td>
                    <td><strong>Asaa</strong></td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td><strong>Atọ</strong></td>
                    <td>8</td>
                    <td><strong>Asato</strong></td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td><strong>Anọ</strong></td>
                    <td>9</td>
                    <td><strong>Itolu</strong></td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td><strong>Ise</strong></td>
                    <td>10</td>
                    <td><strong>Iri</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>To count from 11 to 19, use: <strong>Iri na [Number]</strong>. For example:</p>
            <ul>
              <li>11 = <strong>Iri na otu</strong> (Ten and one)</li>
              <li>12 = <strong>Iri na abụọ</strong> (Ten and two)</li>
              <li>15 = <strong>Iri na ise</strong> (Ten and five)</li>
              <li>20 = <strong>Ogu</strong> or <strong>Iri abụọ</strong> (Two tens)</li>
            </ul>
          `,
          vocabulary: [
            { word: 'Otu', translation: 'One', tonePattern: [1, -1], phonetics: 'ó-tù', type: 'Number' },
            { word: 'Abụọ', translation: 'Two', tonePattern: [-1, 1], phonetics: 'à-bụ́-ɔ́', type: 'Number' },
            { word: 'Atọ', translation: 'Three', tonePattern: [-1, 1], phonetics: 'à-tɔ́', type: 'Number' },
            { word: 'Anọ', translation: 'Four', tonePattern: [-1, 1], phonetics: 'à-nɔ́', type: 'Number' },
            { word: 'Ise', translation: 'Five', tonePattern: [1, 1], phonetics: 'í-sé', type: 'Number' },
            { word: 'Iri', translation: 'Ten', tonePattern: [1, -1], phonetics: 'í-rì', type: 'Number' }
          ]
        },
        {
          id: 'lesson-2-2',
          title: 'Introducing Yourself (Ịkọwa Onwe Gị)',
          description: 'Share your name, home state, and engage in basic friendly dialogue.',
          content: `
            <h3>Introducing Yourself Structure</h3>
            <p>In Igbo, self-introduction uses possessive suffixes and state verbs. Here are the core structures:</p>
            <ul>
              <li><strong>Aha m bụ...</strong> = My name is... (lit. Name of mine is...)</li>
              <li><strong>Abụ m...</strong> = I am... (e.g. Abụ m dọkịta - I am a doctor)</li>
              <li><strong>Ebee ka ị bi?</strong> = Where do you live?</li>
              <li><strong>Anụ m bi na...</strong> = I live in...</li>
              <li><strong>Abụ m onye...</strong> = I am a person of... (e.g. Abụ m onye Imo - I am from Imo State)</li>
            </ul>
          `,
          vocabulary: [
            { word: 'Aha', translation: 'Name', tonePattern: [1, 1], phonetics: 'á-há', type: 'Noun' },
            { word: 'Aha m bụ', translation: 'My name is', tonePattern: [1, 1, 0, 1], phonetics: 'á-há-m-bụ́', type: 'Phrase' },
            { word: 'Abụ m', translation: 'I am', tonePattern: [-1, 1, 0], phonetics: 'à-bụ́-m', type: 'Phrase' },
            { word: 'Onye', translation: 'Person / Who', tonePattern: [1, 1], phonetics: 'ó-nyé', type: 'Noun' },
            { word: 'Obodo', translation: 'Town / Country', tonePattern: [-1, -1, -1], phonetics: 'ò-bò-dò', type: 'Noun' }
          ]
        },
        {
          id: 'lesson-2-3',
          title: 'At the Market (N\'Ahịa)',
          description: 'Learn how to bargain, ask for prices, and talk about food items in Igbo.',
          content: `
            <h3>Market Haggling Culture</h3>
            <p>Bargaining is an art form in Igbo markets. Simply accepting the first price is rare. You are expected to negotiate with humor and respect.</p>
            <ul>
              <li><strong>Ego ole?</strong> = How much money?</li>
              <li><strong>Belata ego!</strong> = Reduce the money! (Bargain!)</li>
              <li><strong>Ọ ọnụ nnukwu!</strong> = It is too expensive!</li>
              <li><strong>Gbakwunye m!</strong> = Add more for me! (Asking for a small bonus/jara)</li>
            </ul>
          `,
          vocabulary: [
            { word: 'Ahịa', translation: 'Market', tonePattern: [1, -1, -1], phonetics: 'á-hị̀-à̀', type: 'Noun' },
            { word: 'Ego', translation: 'Money', tonePattern: [1, 1], phonetics: 'é-gó', type: 'Noun' },
            { word: 'Ego ole?', translation: 'How much?', tonePattern: [1, 1, 1, -1], phonetics: 'é-gó-ó-lè', type: 'Phrase' },
            { word: 'Ji', translation: 'Yam', tonePattern: [1], phonetics: 'jí', type: 'Noun' },
            { word: 'Osikapa', translation: 'Rice', tonePattern: [1, -1, 1, 1], phonetics: 'ó-sì-ká-pá', type: 'Noun' },
            { word: 'Anụ', translation: 'Meat', tonePattern: [1, 1], phonetics: 'á-nụ́', type: 'Noun' }
          ]
        }
      ]
    },
    {
      id: 'level-3',
      title: 'Level 3: Intermediate Mastery (Nnọchianya)',
      shortTitle: 'Intermediate',
      description: 'Dive deep into grammar rules, family trees, action verbs, and building descriptive sentences.',
      lessons: [
        {
          id: 'lesson-3-1',
          title: 'Family & Relations (Ezinaụlọ)',
          description: 'Identify family members and describe relationships.',
          content: `
            <h3>Understanding Family Terms</h3>
            <p>In Igbo, many relationship terms are compound words built from prefixes like <strong>nwa-</strong> (child) or <strong>nne-</strong> (mother) or <strong>nna-</strong> (father):</p>
            <ul>
              <li><strong>Nwanne:</strong> Brother/Sister (lit. Child of my mother)</li>
              <li><strong>Nwanne nwoke:</strong> Brother (lit. Male child of my mother)</li>
              <li><strong>Nwanne nwaanyị:</strong> Sister (lit. Female child of my mother)</li>
              <li><strong>Nwadiala:</strong> Son of the soil / Grandchild of a village</li>
            </ul>
          `,
          vocabulary: [
            { word: 'Nne', translation: 'Mother', tonePattern: [1, -1], phonetics: 'ń-nè', type: 'Noun' },
            { word: 'Nna', translation: 'Father', tonePattern: [1, -1], phonetics: 'ń-nà', type: 'Noun' },
            { word: 'Nwanne', translation: 'Sibling', tonePattern: [1, 1, -1], phonetics: 'nwá-ń-nè', type: 'Noun' },
            { word: 'Nwoke', translation: 'Man / Male', tonePattern: [1, -1], phonetics: 'nwó-kè', type: 'Noun' },
            { word: 'Nwaanyị', translation: 'Woman / Female', tonePattern: [1, -1, -1], phonetics: 'nwá-à-nyị̀', type: 'Noun' }
          ]
        },
        {
          id: 'lesson-3-2',
          title: 'Verbs & Action Words (Ngwaa)',
          description: 'conjugate verbs and express actions in Past, Present, and Future.',
          content: `
            <h3>Verbal Suffixes & Tense Markers</h3>
            <p>Igbo verbs are highly agglutinative—they form tenses by attaching suffixes to the root verb.</p>
            <ul>
              <li><strong>Root verb:</strong> e.g., <strong>ri</strong> (to eat)</li>
              <li><strong>Infinitive:</strong> Starts with <strong>i-</strong> or <strong>ị-</strong> depending on vowel harmony. e.g., <strong>Iri</strong> (To eat), <strong>Ịsa</strong> (To wash).</li>
              <li><strong>Present Continuous:</strong> Prefix <strong>na-</strong>. e.g., <strong>O na-eri nri</strong> (He/She is eating food).</li>
              <li><strong>Past Tense suffix (-chara / -rị / -go):</strong> e.g., <strong>O riela nri</strong> (He/She has eaten food).</li>
              <li><strong>Future Tense marker (ga-):</strong> e.g., <strong>O ga-eri nri</strong> (He/She will eat food).</li>
            </ul>
          `,
          vocabulary: [
            { word: 'Iri', translation: 'To eat', tonePattern: [1, 1], phonetics: 'í-rí', type: 'Verb' },
            { word: 'Ije', translation: 'To go / walk', tonePattern: [1, 1], phonetics: 'í-jé', type: 'Verb' },
            { word: 'Ịsa', translation: 'To wash', tonePattern: [-1, 1], phonetics: 'ị̀-sá', type: 'Verb' },
            { word: 'Ịzụ', translation: 'To buy', tonePattern: [-1, 1], phonetics: 'ị̀-zụ́', type: 'Verb' },
            { word: 'Isu', translation: 'To speak', tonePattern: [1, 1], phonetics: 'í-sú', type: 'Verb' }
          ]
        }
      ]
    },
    {
      id: 'level-4',
      title: 'Level 4: Advanced Cultural Fluency (Onye Maara)',
      shortTitle: 'Advanced',
      description: 'Master Igbo proverbs (Ilu), idioms, and rich cultural traditions to speak like an elder.',
      lessons: [
        {
          id: 'lesson-4-1',
          title: 'Igbo Proverbs (Ilu)',
          description: 'Learn why proverbs are "the palm oil with which words are eaten".',
          content: `
            <h3>The Power of "Ilu"</h3>
            <p>In Igbo culture, conversation is an art. Chinua Achebe famously wrote, <em>"Proverbs are the palm oil with which words are eaten."</em> An orator who cannot use proverbs is considered immature. Using them correctly displays high wisdom and cultural knowledge.</p>
            <p>Let's study the structure of some basic proverbs in our Vocabulary card section.</p>
          `,
          vocabulary: [
            { word: 'Ilu', translation: 'Proverb / Bitter', tonePattern: [1, -1], phonetics: 'í-lù', type: 'Noun' },
            { word: 'Aka nri kwọọ aka ekpe, aka ekpe akwọọ aka nri.', translation: 'If the right hand washes the left, the left hand washes the right. (Cooperation)', tonePattern: [1], phonetics: 'a-ka-n-ri-kwo...', type: 'Proverb' },
            { word: 'Gidi gidi bụ ugwu eze.', translation: 'Unity is the strength of a king. (Strength in numbers)', tonePattern: [1], phonetics: 'gi-di-gi-di-bu...', type: 'Proverb' }
          ]
        },
        {
          id: 'lesson-4-2',
          title: 'Customs & Naming (Omenala)',
          description: 'Explore naming ceremonies, titles, and traditional societal values.',
          content: `
            <h3>Traditional Naming (Ịgụ Aha)</h3>
            <p>Names in Igbo culture are not just tags; they are circumstances of birth, prayer statements, or expressions of thankfulness. Many names contain suffixes like:</p>
            <ul>
              <li><strong>-chukwu / -chi:</strong> Meaning God. E.g., <strong>Chinedu</strong> (God guides), <strong>Chiamaka</strong> (God is beautiful).</li>
              <li><strong>-nma:</strong> Meaning beauty. E.g., <strong>Chioma</strong> (Good God / Good luck).</li>
              <li><strong>-amaka:</strong> Meaning is beautiful. E.g., <strong>Ndidiamaaka</strong> (Patience is beautiful).</li>
            </ul>
          `,
          vocabulary: [
            { word: 'Omenala', translation: 'Tradition / Custom', tonePattern: [1, -1, 1, 1], phonetics: 'ó-mè-ná-lá', type: 'Noun' },
            { word: 'Chi', translation: 'Personal god / Destiny', tonePattern: [1], phonetics: 'chí', type: 'Noun' },
            { word: 'Chukwu', translation: 'God Almighty', tonePattern: [1, 1], phonetics: 'chú-kwú', type: 'Noun' },
            { word: 'Eze', translation: 'King', tonePattern: [1, 1], phonetics: 'é-zé', type: 'Noun' }
          ]
        }
      ]
    }
  ],

  // 3. DIALOGUES AND REAL WORLD PHRASES
  greetings: [
    { category: 'Daily Greetings', igbo: 'Kedu?', english: 'How are you / Hello', response: 'Ọ dị mma (I am fine)', context: 'General informal' },
    { category: 'Daily Greetings', igbo: 'Ịbọla chị?', english: 'Good morning (lit. Have you woken up?)', response: 'Ee, abọla m (Yes, I have woken up)', context: 'Morning respect' },
    { category: 'Daily Greetings', igbo: 'Mma mma chị', english: 'Good afternoon / evening', response: 'Mma mma', context: 'Standard greeting' },
    { category: 'Daily Greetings', igbo: 'Ka ọ dị', english: 'Goodbye / Farewell', response: 'Ka ọ dị', context: 'Parting phrase' },
    
    { category: 'Showing Respect', igbo: 'Ndeewo', english: 'Greetings / Thank you / Well done', response: 'Ndeewo', context: 'Respectful, used for elders' },
    { category: 'Showing Respect', igbo: 'Dalu', english: 'Thank you / Thank you for your work', response: 'O dị mma', context: 'Appreciating someone' },
    { category: 'Showing Respect', igbo: 'Eze/Lolo', english: 'King / Queen (Titles)', response: 'Respectful salutations', context: 'Cultural title' },

    { category: 'Marketplace Speak', igbo: 'Ego ole ka ọ bụ?', english: 'How much is this?', response: 'Ọ bụ [Amount] Naira', context: 'Buying items' },
    { category: 'Marketplace Speak', igbo: 'Belata ego', english: 'Reduce the price / discount please', response: 'Mba, ọ bụ ezigbo ego (No, it is a good price)', context: 'Bargaining' },
    { category: 'Marketplace Speak', igbo: 'Gbakwunye m', english: 'Give me a bonus / extra (jara)', response: 'Ọ dị mma (Alright)', context: 'After purchasing food items' },

    { category: 'Welcome & Travel', igbo: 'Nnọọ', english: 'Welcome', response: 'Ndeewo (Thank you)', context: 'Welcoming guests' },
    { category: 'Welcome & Travel', igbo: 'Ije ọma', english: 'Safe journey / Good travels', response: 'Dalu / Ka ọ dị', context: 'Wishing someone well' },
    { category: 'Welcome & Travel', igbo: 'Biko', english: 'Please', response: 'O dị mma', context: 'Making a request' }
  ],

  // 4. IGBO PROVERBS (ILU IGBO)
  proverbs: [
    {
      proverb: 'Ilu bụ mmanụ e ji eri okwu.',
      literal: 'Proverbs are the palm oil with which words are eaten.',
      meaning: 'Proverbs are essential to wisdom and communication in Igbo society. You must use them to make speeches pleasing and easy to digest.',
      tonePattern: [1]
    },
    {
      proverb: 'Gidi gidi bụ ugwu eze.',
      literal: 'Unity/Crowd is the prestige of a king.',
      meaning: 'There is strength in numbers and cooperation. A community\'s unity and solidarity is what gives its leadership power.',
      tonePattern: [1]
    },
    {
      proverb: 'A rụọ n\'anwụ, e rie na ndò.',
      literal: 'If you work in the sun, you will eat in the shade.',
      meaning: 'Hard work brings sweet rewards. Labor and diligence today guarantee rest and comfort in the future.',
      tonePattern: [1]
    },
    {
      proverb: 'Nwayọ nwayọ ka e ji aracha ofe dị ọkụ.',
      literal: 'Slowly, slowly is how one licks hot soup.',
      meaning: 'Patience is needed when tackling difficult situations. Moving too fast leads to mistakes or pain.',
      tonePattern: [1]
    },
    {
      proverb: 'Onye nwayọ na-aga ije na-aga n’ogwu.',
      literal: 'He who walks slowly walks on thorns without getting hurt.',
      meaning: 'Carefulness, caution, and mindfulness protect one from the dangers of life.',
      tonePattern: [1]
    },
    {
      proverb: 'Aka nri kwọọ aka ekpe, aka ekpe akwọọ aka nri.',
      literal: 'If the right hand washes the left, the left hand washes the right.',
      meaning: 'Mutual support and cooperation are essential. We need one another to achieve cleanliness and success.',
      tonePattern: [1]
    }
  ],

  // 5. VOCABULARY FLASHCARD DECKS
  vocabDecks: {
    animals: [
      { word: 'Ewu', translation: 'Goat', tonePattern: [1, -1], phonetics: 'é-wù' },
      { word: 'Nkịta', translation: 'Dog', tonePattern: [-1, 1, -1], phonetics: 'ǹ-kị́-tà̀' },
      { word: 'Mpi', translation: 'Horn', tonePattern: [1, 1], phonetics: 'm-pí' },
      { word: 'Enyi', translation: 'Elephant / Friend', tonePattern: [1, -1], phonetics: 'é-nyì' },
      { word: 'Agu', translation: 'Leopard / Tiger (popularly)', tonePattern: [1, 1], phonetics: 'á-gú' },
      { word: 'Agwọ', translation: 'Snake', tonePattern: [1, -1], phonetics: 'á-gwɔ̀' },
      { word: 'Ọkụkọ', translation: 'Chicken', tonePattern: [1, -1, -1], phonetics: 'ɔ́-kụ̀-kɔ̀' }
    ],
    food: [
      { word: 'Ji', translation: 'Yam', tonePattern: [1], phonetics: 'jí' },
      { word: 'Osikapa', translation: 'Rice', tonePattern: [1, -1, 1, 1], phonetics: 'ó-sì-ká-pá' },
      { word: 'Ofe', translation: 'Soup', tonePattern: [1, -1], phonetics: 'ó-fè' },
      { word: 'Nri', translation: 'Food / Meal', tonePattern: [1, 1], phonetics: 'ń-rí' },
      { word: 'Miri', translation: 'Water', tonePattern: [1, 1], phonetics: 'mí-rí' },
      { word: 'Anụ', translation: 'Meat', tonePattern: [1, 1], phonetics: 'á-nụ́' },
      { word: 'Mmanụ', translation: 'Oil', tonePattern: [1, 1], phonetics: 'mmá-nụ́' }
    ],
    family: [
      { word: 'Nne', translation: 'Mother', tonePattern: [1, -1], phonetics: 'ń-nè' },
      { word: 'Nna', translation: 'Father', tonePattern: [1, -1], phonetics: 'ń-nà' },
      { word: 'Nwa', translation: 'Child', tonePattern: [1], phonetics: 'nwá' },
      { word: 'Nwanne', translation: 'Sibling', tonePattern: [1, 1, -1], phonetics: 'nwá-ń-nè' },
      { word: 'Dị', translation: 'Husband', tonePattern: [1], phonetics: 'dị́' },
      { word: 'Nwunye', translation: 'Wife', tonePattern: [1, -1], phonetics: 'nwú-nyè' },
      { word: 'Enyi', translation: 'Friend / Elephant', tonePattern: [1, -1], phonetics: 'é-nyì' }
    ],
    verbs: [
      { word: 'Bia', translation: 'Come', tonePattern: [1], phonetics: 'byá' },
      { word: 'Gaa', translation: 'Go', tonePattern: [1], phonetics: 'gá' },
      { word: 'Rie', translation: 'Eat', tonePattern: [1, 1], phonetics: 'rí-é' },
      { word: 'Ñụọ', translation: 'Drink', tonePattern: [1, 1], phonetics: 'ñụ́-ọ́' },
      { word: 'Zụọ', translation: 'Buy', tonePattern: [1, 1], phonetics: 'zụ́-ọ́' },
      { word: 'Kwu', translation: 'Speak / Talk', tonePattern: [1], phonetics: 'kwú' },
      { word: 'Hụ', translation: 'See', tonePattern: [1], phonetics: 'hụ́' }
    ]
  },

  // 6. QUIZ QUESTIONS GENERATION SOURCE
  quizzes: [
    {
      question: 'What vowel harmony group does the word "Ụlọ" belong to?',
      options: ['Heavy group', 'Light group', 'Neutral group', 'Mixed group'],
      answer: 'Light group',
      explanation: 'Both "ụ" and "ọ" have dots under them, which places them in the Light vowel group.'
    },
    {
      question: 'Depending on the tone pattern, the word "Óké" (High-High) means what?',
      options: ['Male', 'Boundary', 'Portion', 'Rat'],
      answer: 'Rat',
      explanation: 'Óké with High-High tone means Rat. Òkè (Low-Low) means portion, Òké (Low-High) means boundary, and Ókè (High-Low) means male.'
    },
    {
      question: 'Which of these greetings is most appropriate for a respected elder in the morning?',
      options: ['Kedu', 'Ka ọ dị', 'Ndeewo', 'Ịbọla chị'],
      answer: 'Ịbọla chị',
      explanation: 'Ịbọla chị translates to "Have you woken up?" and is a traditional, highly respectful morning greeting.'
    },
    {
      question: 'Translate: "Ego ole ka ọ bụ?"',
      options: ['What is your name?', 'How much is it?', 'Where do you live?', 'Bring the food.'],
      answer: 'How much is it?',
      explanation: '"Ego ole" means "how much money". Adding "ka ọ bụ" means "is it?".'
    },
    {
      question: 'What is the literal translation of the proverb: "Gidi gidi bụ ugwu eze"?',
      options: [
        'A king rules by law.',
        'Slowly, one licks hot soup.',
        'Unity/Crowd is the prestige of a king.',
        'If the right hand washes the left, it becomes clean.'
      ],
      answer: 'Unity/Crowd is the prestige of a king.',
      explanation: '"Gidi gidi" represents unified energy or numbers, which provides strength and prestige ("ugwu") to a king ("eze").'
    },
    {
      question: 'How do you say the number "15" in Igbo?',
      options: ['Iri na otu', 'Iri na ise', 'Otu na ise', 'Iri na abụọ'],
      answer: 'Iri na ise',
      explanation: '15 is constructed as 10 (Iri) plus (na) 5 (ise) = Iri na ise.'
    },
    {
      question: 'What does the noun "Osikapa" mean?',
      options: ['Yam', 'Water', 'Meat', 'Rice'],
      answer: 'Rice',
      explanation: '"Osikapa" is the Igbo word for Rice.'
    },
    {
      question: 'If the root verb is "ri" (to eat), how do you say "He is eating food" in the present continuous tense?',
      options: ['O riela nri', 'O ga-eri nri', 'O na-eri nri', 'O riri nri'],
      answer: 'O na-eri nri',
      explanation: 'The marker "na-" indicates present continuous tense in Igbo: "O na-eri nri".'
    }
  ]
};

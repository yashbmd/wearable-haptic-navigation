const pptxgen = require('pptxgenjs');
const pptx = new pptxgen();
pptx.layout='LAYOUT_WIDE'; pptx.author='Project Team — engineering design';
pptx.subject='Vishwakarma Awards 2026–27 / Stage 2 design specification';
pptx.title='Wearable vision-assisted haptic navigation aid';
pptx.lang='en-IN';
const S=pptx.ShapeType;
const C={bg:'F6F4EF',ink:'152D35',black:'122329',teal:'0F7875',deep:'0A5654',mint:'D5EAE4',orange:'DE844F',pale:'F7E5D7',grey:'5D6C70',line:'D9DFDB',white:'FFFFFF',red:'AE5E55',palered:'F7E4E0',blue:'E3ECF2'};
const sw=13.333, sh=7.5;
const fs={h1:32,h2:23,b:14,sm:10,micro:8};
function tx(s,t,x,y,w,h,o={}) {s.addText(t,{x,y,w,h,fontFace:o.serif?'Georgia':'Aptos',fontSize:o.size||fs.b,color:o.color||C.ink,bold:o.bold||false,breakLine:false,margin:0,fit:'shrink',valign:o.valign||'mid',lineSpacingMultiple:1.04,align:o.align||'left',...o});}
function box(s,x,y,w,h,fill=C.white,rad=.12,linecolor=null){ s.addShape(S.roundRect,{x,y,w,h,rectRadius:rad,line:{color:linecolor||fill,width:linecolor?1:0},radius:rad,fill:{color:fill}}); }
function ln(s,x1,y1,x2,y2,color=C.line,width=1,dash){s.addShape(S.line,{x:x1,y:y1,w:x2-x1,h:y2-y1,line:{color,width,beginArrowType:'none',endArrowType:'none',dashType:dash}});}
function circ(s,x,y,d,color){s.addShape(S.ellipse,{x,y,w:d,h:d,line:{color,width:0},fill:{color}});}
function small(s,t,x,y,w,color=C.grey){tx(s,t,x,y,w,.22,{size:8.7,bold:true,charSpacing:1.2,color});}
function txtrow(s,x,y,top,bot,w,color=C.teal){box(s,x,y,w,0.85,C.white);box(s,x,y,.055,.85,color);tx(s,top,x+.2,y+.09,w-.4,.25,{size:12,bold:true});tx(s,bot,x+.2,y+.39,w-.4,.32,{size:10.2,color:C.grey});}
function tag(s,t,x,y,w,bg=C.mint,tc=C.deep){box(s,x,y,w,.31,bg,.08);tx(s,t,x+.09,y+.05,w-.16,.21,{size:9.0,color:tc,bold:true});}
function newslide(no,section,title,subtitle='',refs=''){const s=pptx.addSlide();s.background={color:C.bg};box(s,0,0,sw,.14,C.teal);small(s,'VISHWAKARMA AWARDS 2026–27 / STAGE 2',.57,.31,6);small(s,String(no).padStart(2,'0')+' / '+section.toUpperCase(),10.15,.31,2.63,C.teal);tx(s,title,.57,.70,12.0,.58,{size:29,serif:true,color:C.ink,bold:true});if(subtitle)tx(s,subtitle,.59,1.37,11.7,.47,{size:13,color:C.grey});ln(s,.58,7.05,12.77,7.05);tx(s,'Wearable vision-assisted haptic navigation  •  design-stage evidence',.58,7.14,8.5,.15,{size:7.9,color:C.grey});tx(s,refs,8.1,7.14,4.4,.15,{size:7.2,color:C.grey,align:'right'});tx(s,String(no).padStart(2,'0'),12.56,7.14,.22,.15,{size:7.9,bold:true,color:C.teal,align:'right'});return s;}
function step(s,x,y,w,title,desc,accent=C.teal){box(s,x,y,w,1.14,C.white);box(s,x,y,.065,1.14,accent);tx(s,title,x+.22,y+.14,w-.36,.28,{size:15,bold:true});tx(s,desc,x+.22,y+.49,w-.4,.5,{size:11,color:C.grey,valign:'top'});}
function bullet(s,t,x,y,w,sz=13,color=C.ink){circ(s,x,y+.12,.095,C.orange);tx(s,t,x+.23,y,w-.23,.53,{size:sz,color,valign:'top'});}
function ref(s,txt,url){ tx(s,txt,.66,2,11,.34,{size:14});}
function arrow(s,x1,y1,x2,y2,col=C.teal){s.addShape(S.line,{x:x1,y:y1,w:x2-x1,h:y2-y1,line:{color:col,width:2.1,endArrowType:'triangle'}})}
function infoCard(s,x,y,w,h,head,body,color=C.teal){box(s,x,y,w,h,C.white,.14);circ(s,x+.19,y+.19,.13,color);tx(s,head,x+.42,y+.10,w-.61,.40,{size:14,bold:true});tx(s,body,x+.21,y+.60,w-.42,h-.75,{size:11.2,valign:'top',color:C.grey});}
// 1 — title
{
 let s=pptx.addSlide();s.background={color:C.ink};box(s,.0,.0,sw,.16,C.orange);
 small(s,'VISHWAKARMA AWARDS 2026–27  •  STAGE 2 DESIGN PROPOSAL',.7,.6,9.5,'E1D5C0');
 tx(s,'A warning you can feel,\nbefore the next step.',.70,1.25,9.5,1.65,{size:39,color:C.white,serif:true,bold:true,breakLine:false});
 tx(s,'WEARABLE VISION-ASSISTED HAPTIC NAVIGATION AID',.72,3.10,10.6,.48,{size:20,color:'B8DED5',bold:true});
 tx(s,'A left / centre / right tactile early-warning layer that adapts its preview horizon to walking speed — designed to complement a white cane.',.72,3.78,9.4,.99,{size:17,color:'ECF1EF'});
 box(s,.72,5.35,10.9,1.02,'214149');
 tx(s,'Theme alignment',.97,5.53,1.55,.27,{size:10,color:'B9D4D0'});
 tx(s,'Assistive Solutions & Inclusive Living (EnAble India)',2.62,5.46,5.3,.39,{size:13,color:C.white,bold:true});
 tx(s,'Registered track / team / application ID: TEAM MUST VERIFY',.97,5.96,9.8,.19,{size:9,color:'E7C6B6'});
 // Road-line illustration
 for(let i=0;i<3;i++){ln(s,10.5,1.07+i*.68,12.45,1.07+i*.68,'40646C',1.4)}
 for(let i=0;i<3;i++){circ(s,10.62+i*.49,3.05,.24,['D47E51','64A29A','64A29A'][i])}
 tx(s,'IIT Indore  •  Research-oriented hardware design  •  25 October 2026',.73,6.93,11.9,.18,{size:10,color:'C4CFCA'});
}
//2
{
 let s=newslide(2,'Need','A mobility gap beyond the cane tip','The most useful cue is often not a destination instruction, but a timely sense of where an approaching obstruction is.', '[R2] [R3] [R4]');
 box(s,.63,2.13,4.05,3.67,C.ink);tx(s,'2.2 billion',.91,2.46,3.38,.7,{size:32,color:C.white,bold:true});tx(s,'people worldwide live with near or distance vision impairment (WHO, 2026).',.93,3.26,3.30,.95,{size:16,color:'D3E3DF'});ln(s,.91,4.55,4.34,4.55,'507B7F',1.3);tx(s,'Global context — not the market size of our prototype.',.91,4.79,3.30,.62,{size:11,color:'A9CDC7'});
 infoCard(s,5.02,2.16,3.34,1.55,'The real task','Detect the next obstacle early enough to decide whether to slow or turn.');
 infoCard(s,8.57,2.16,3.87,1.55,'The device gap','Provide quiet directional cues without hiding environmental sound.');
 infoCard(s,5.02,3.99,3.34,1.63,'User-first constraint','Keep both hands free; retain the long cane and learned mobility skills.',C.orange);
 infoCard(s,8.57,3.99,3.87,1.63,'Not a navigation autopilot','No claims of road crossing, curb detection, or collision prevention until tested.',C.orange);
}
//3
{
 let s=newslide(3,'Journey','Before and after: one crossing, two experiences','Illustrative interaction storyboard. It is a design hypothesis, not a field trial or an observed user outcome.', '[R3] [R4]');
 small(s,'CURRENT PATH — CANE + ENVIRONMENT',.76,2.03,5.6,C.red);
 const A=[['Walk','Listen, sweep cane, monitor path'],['Uncertain','Moving pedestrian enters peripheral approach'],['React','Late or ambiguous directional information']];
 A.forEach((e,i)=>step(s,.73+i*3.95,2.42,3.65,e[0],e[1],C.red));
 small(s,'PROPOSED ADDITION — TACTILE WARNING LAYER',.76,4.06,5.9,C.teal);
 const B=[['Observe','Forward camera captures scene'],['Estimate','Temporal motion + risk + spatial sector'],['Cue','A short L / C / R vibration invites a decision']];
 B.forEach((e,i)=>step(s,.73+i*3.95,4.45,3.65,e[0],e[1],C.teal));
 box(s,.80,5.96,11.75,.59,C.pale);
 tx(s,'What we will compare: warning lead time, directional confusion, false cues per hour, and course contacts.',1.02,6.10,11.0,.28,{size:11.4,color:C.ink,bold:true});
}
//4
{
 let s=newslide(4,'Research gap','What the literature supports — and what it does not','The idea is not “AI sees everything.” The engineering contribution is a cautious fusion of perception, timing and understandable touch.', '[R3] [R4] [R5] [R6] [R10]');
 const rows=[['Mobility aids and electronics already exist','Our 3-sonar study motivated a pivot: narrow beams leave gaps; cameras add scene context.'],['Hands-free feedback is promising','Reported demonstrations vary widely; readiness and localization remain challenges.'],['Monocular depth helps scene ordering','Depth Anything V2 predicts detailed relative depth by default, not trustworthy meters.'],['Our testable contribution','A camera-to-haptics timing budget with speed-adaptive preview and explicit uncertainty behavior.']];
 rows.forEach((r,i)=>{let y=2.05+i*1.1;box(s,.69,y,11.90,.93,i===3?C.mint:C.white);tx(s,r[0],.94,y+.13,4.5,.27,{size:14,bold:true,color:i===3?C.deep:C.ink});tx(s,r[1],5.19,y+.10,7.0,.56,{size:12.2,color:C.grey});});
 tx(s,'Novelty claim is about integration and evaluation protocol; no patentability or first-in-world claim is made.',.86,6.59,11.4,.26,{size:10.6,color:C.red});
}
//5 architecture
{
 let s=newslide(5,'Architecture','A working division of labour','High-compute vision stays off the Arduino. A simple microcontroller handles the time-critical three-channel output.', '[R6] [R7] [R8] [R9]');
 const units=[
  [0.79,2.2,2.13,1.06,'CAMERA','Video stream','F0F5F4'],
  [3.55,2.2,2.42,1.06,'VISION HOST','Laptop prototype','D5EAE4'],
  [6.60,2.2,2.40,1.06,'RISK LOGIC','Track / rank / gate','D5EAE4'],
  [9.65,2.2,2.90,1.06,'ARDUINO UNO R4','Serial → PWM on D3/5/6','EDE2D8']
 ];
 units.forEach(u=>{box(s,u[0],u[1],u[2],u[3],u[6]);tx(s,u[4],u[0]+.16,u[1]+.17,u[2]-.27,.28,{size:13.8,bold:true});tx(s,u[5],u[0]+.16,u[1]+.62,u[2]-.27,.20,{size:10.6,color:C.grey});});
 arrow(s,2.98,2.72,3.44,2.72);arrow(s,6.01,2.72,6.49,2.72);arrow(s,9.03,2.72,9.52,2.72);
 box(s,2.05,4.1,3.4,.95,C.white);tx(s,'Optional sensor checks',2.24,4.24,3,.27,{size:14,bold:true});tx(s,'MPU6050; HC-SR04 (experimental)',2.24,4.65,3.0,.19,{size:10,color:C.grey});
 box(s,6.08,4.1,2.95,.95,C.white);tx(s,'Driver electronics',6.31,4.24,2.6,.28,{size:14,bold:true});tx(s,'3 × MOSFET + flyback diodes',6.31,4.65,2.6,.18,{size:10.2,color:C.grey});
 box(s,9.61,4.1,2.93,.95,C.white);tx(s,'Wearer + environment',9.84,4.24,2.57,.28,{size:14,bold:true});tx(s,'L / C / R tactile zones',9.84,4.65,2.57,.20,{size:10.2,color:C.grey});
 arrow(s,10.92,3.36,10.92,4.04);arrow(s,9.50,4.56,9.06,4.56);
 ln(s,3.76,5.46,3.76,5.94,C.grey,1.5);ln(s,3.76,5.94,11.08,5.94,C.grey,1.5);ln(s,11.08,5.94,11.08,5.13,C.grey,1.5);
 tx(s,'Human-in-the-loop feedback: changed walking direction and speed alter the next camera observation.',1.10,6.34,11.40,.3,{size:12,color:C.deep,bold:true});
}
//6
{
 let s=newslide(6,'Control','This is supervisory control, not a PID motor loop','The controller decides when and where to warn; the person remains responsible for the movement.', '[R3] [R4]');
 box(s,.80,2.13,11.73,1.28,C.ink);
 const arr=['World / hazard','Camera observation','Risk controller','Haptic pattern','Human response'];
 let x=.96;
 arr.forEach((r,i)=>{tx(s,r,x,2.53,i===4?2.06:2.10,.33,{size:13,color:C.white,bold:i===2});x+=2.36});
 for(let i=0;i<4;i++)arrow(s,2.78+i*2.36,2.78,3.18+i*2.36,2.78,'D5D6BD');
 step(s,.82,3.90,3.69,'Reference / objective','Give adequate warning for a safe human decision; no fixed route setpoint.');
 step(s,4.82,3.90,3.69,'Manipulated variable','Motor PWM intensity and temporal pattern per left / centre / right zone.');
 step(s,8.82,3.90,3.69,'Disturbances','Illumination, motion blur, crowds, occlusion, delays, motor power variation.');
 box(s,.82,5.44,11.70,.81,C.mint);
 tx(s,'Feedback is the next observation of the world after the wearer moves — not a feedback wire from the motor.',1.09,5.62,11.16,.42,{size:13,color:C.deep,bold:true});
}
//7
{
 let s=newslide(7,'Perception','From moving pixels to a restrained warning','Each stage is observable and loggable, so a wrong alert can be traced to its source.', '[R6] [R7]');
 const items=[['01','DETECT','YOLOv8n: candidate people / objects'],['02','TRACK','ByteTrack: associate objects over time'],['03','ESTIMATE','Apparent growth + optional relative depth'],['04','ASSIGN','Left / centre / right image sector'],['05','GATE','Persistence, freshness, urgency tier'],['06','OUTPUT','PWM {0,85,160,235}; protected drivers']];
 items.forEach((it,i)=>{const x=i%3*4.04+.70, y=2.15+Math.floor(i/3)*1.59; box(s,x,y,3.75,1.24,C.white);tag(s,it[0],x+.18,y+.2,.50,C.pale,C.ink);tx(s,it[1],x+.87,y+.18,2.70,.24,{size:13.6,bold:true});tx(s,it[2],x+.22,y+.66,3.30,.40,{size:11.5,color:C.grey});});
 box(s,.73,5.59,11.70,.64,C.palered);
 tx(s,'Technical limit: default relative monocular depth ≠ metric distance. Meter-based alarms remain disabled until calibrated.',.97,5.74,11.29,.27,{size:11.9,color:'914B47',bold:true});
}
//8
{
 let s=newslide(8,'Model','Walking faster should mean looking farther ahead','An analytical warning-distance budget. Values illustrate the proposed control law; they are not observations from users.', '[R4] Engineering design');
 box(s,.73,2.04,5.43,1.03,C.ink);tx(s,'Dwarn(v) = v × (Tr + Tp) + M',.94,2.35,5.05,.38,{size:21,color:C.white,bold:true});
 tx(s,'Design scenario: Tr = 1.50 s, Tp = 0.25 s, M = 0.50 m',.93,3.28,5.6,.49,{size:13,color:C.grey});
 const speeds=[.8,1.0,1.4], dist=[1.90,2.25,2.95];
 speeds.forEach((v,i)=>{let y=4.02+i*.72;tx(s,`${v.toFixed(1)} m/s`,.87,y,1.14,.33,{size:13,bold:true});box(s,2.16,y+.02,dist[i]*.99,.30,i===2?C.orange:C.teal);tx(s,`${dist[i].toFixed(2)} m`,5.21,y-.02,.74,.35,{size:13,bold:true,color:C.deep});});
 box(s,6.61,2.05,5.76,4.29,C.white);small(s,'CHECK AGAINST PHYSICAL REALITY',6.91,2.35,4.6,C.teal);
 bullet(s,'Walking speed must be calibrated (IMU/steps or an independent measurement).',6.90,2.82,5.16,11.8);
 bullet(s,'Prediction and camera acquisition delay need measured p95 values.',6.90,3.70,5.16,11.8);
 bullet(s,'Distance thresholds need measured, metric range; relative depth cannot supply meters directly.',6.90,4.56,5.16,11.8);
 tx(s,'The aim: less “surprise”, not maximum vibration.',.90,6.52,10.7,.30,{size:13,color:C.deep,bold:true});
}
//9
{
 let s=newslide(9,'Targets','Engineering specification | designed versus measured','Targets will be refined after instrumented bench trials. “TBD” means the requirement is open, not secretly achieved.', '[R8] [R9]');
 const r=[['Vision source','ESP32-CAM candidate / USB camera','To be selected / FOV measured'],['Detector','YOLOv8n + temporal tracking','Host implementation supplied'],['Haptic channels','3 separately driven ERM motors','D3, D5, D6 on UNO R4'],['Alert update','≥ 5 Hz during demo','Target — unmeasured'],['End-to-end delay','Measure median and p95','No result yet'],['Health monitor','Command timeout 500 ms','Firmware specified; bench test pending'],['Runtime / mass','≥ 2 h goal / weigh assembly','Target / TBD'],['Deployment','Laptop-host demo → portable host','Portable feasibility unverified']];
 const start=2.05;box(s,.77,start,11.78,.44,C.ink);const cols=[.91,4.35,8.72];['PARAMETER','PROPOSED SPECIFICATION','STATUS / EVIDENCE'].forEach((t,i)=>tx(s,t,cols[i],start+.1,[3.1,3.85,3.7][i],.21,{size:10.7,color:C.white,bold:true}));
 r.forEach((it,i)=>{let y=start+.46+i*.485;box(s,.77,y,11.78,.45,i%2?C.white:'E9EEEB');tx(s,it[0],.91,y+.09,3.28,.28,{size:11.4,bold:true});tx(s,it[1],4.35,y+.09,4.2,.29,{size:11.2});tx(s,it[2],8.72,y+.09,3.62,.29,{size:10.8,color:i===5?C.teal:C.grey});});
}
//10
{
 let s=newslide(10,'Mechanics','Made to wear — without 3D printing','Mounting is intentionally low-tech: a spectacle clip, cable strain relief, textile strap and pocketed electronics.', 'Engineering concept illustration');
 // spectacle front elevation
 box(s,.74,2.03,7.31,3.65,C.white);small(s,'FRONT-VIEW ASSEMBLY CONCEPT — NOT AN AS-BUILT PHOTO',1.00,2.27,6.4,C.teal);
 // glasses bridge and lenses
 s.addShape(S.ellipse,{x:1.52,y:3.12,w:2.28,h:1.03,line:{color:C.ink,width:3},fill:{color:'F0F4F3',transparency:65}});
 s.addShape(S.ellipse,{x:4.43,y:3.12,w:2.28,h:1.03,line:{color:C.ink,width:3},fill:{color:'F0F4F3',transparency:65}});
 ln(s,3.80,3.34,4.43,3.34,C.ink,3);ln(s,1.5,3.36,.99,3.26,C.ink,2.4);ln(s,6.71,3.36,7.22,3.26,C.ink,2.4);
 box(s,3.74,2.75,.71,.48,C.orange);circ(s,4.02,2.89,.20,C.ink);
 arrow(s,4.21,2.72,5.05,2.29,C.orange);tx(s,'camera / clip',5.07,2.13,2.29,.29,{size:12,bold:true,color:C.orange});
 ln(s,4.1,3.26,4.1,4.64,C.grey,1.5);tx(s,'cable with strain relief',4.37,4.46,3.16,.26,{size:11,color:C.grey});
 // tactile band
 box(s,8.45,2.03,4.08,3.65,C.white);small(s,'TACTILE BAND — PLACEMENT CONCEPT',8.74,2.27,3.57,C.teal);
 box(s,8.97,3.14,3.11,1.18,'E2E9E4');const z=[9.35,10.35,11.35];z.forEach((xx,i)=>{circ(s,xx,3.52,.28,i===1?C.orange:C.teal);});
 tx(s,'L',9.37,3.94,.23,.30,{size:12,bold:true,align:'center'});tx(s,'C',10.37,3.94,.23,.30,{size:12,bold:true,align:'center'});tx(s,'R',11.37,3.94,.23,.30,{size:12,bold:true,align:'center'});
 tx(s,'Soft, adjustable band',9.02,4.55,3.0,.33,{size:12,color:C.grey});
 tx(s,'No load-bearing frame is proposed; bench pull-out / fatigue tests are more relevant than invented FEA. Record pitch, FOV, mass and strap spacing.',.86,6.08,11.6,.61,{size:12.2,color:C.grey});
}
//11
{
 let s=newslide(11,'Electrical','Three protected motor channels; one shared ground','Build logic is specified. Actual wiring photograph and current measurements must come from the team.', '[R8] [R10]');
 box(s,.71,2.05,7.43,4.48,C.white);small(s,'ONE CHANNEL SHOWN — REPEAT ×3: D3 / D5 / D6',.93,2.27,6.65,C.teal);
 box(s,1.02,3.39,1.69,.82,C.mint);tx(s,'UNO R4',1.23,3.53,1.39,.29,{size:14,bold:true});tx(s,'D3 PWM',1.25,3.92,1.22,.19,{size:10.8,color:C.grey});
 box(s,3.16,3.53,1.17,.50,C.pale);tx(s,'220 Ω',3.38,3.69,.8,.20,{size:11.7,bold:true});
 box(s,5.74,4.22,1.56,.77,C.ink);tx(s,'logic-level',5.88,4.36,1.33,.22,{size:10.2,color:C.white});tx(s,'N-MOSFET',5.87,4.66,1.36,.20,{size:10.6,color:C.white,bold:true});
 box(s,5.91,2.91,1.20,.55,'E2EAE7');tx(s,'ERM motor',6.02,3.06,.99,.23,{size:11.7,bold:true});
 // Gate path: PWM -> resistor -> gate (left side of MOSFET)
 ln(s,2.71,3.80,3.16,3.80,C.teal,2);ln(s,4.33,3.80,5.38,3.80,C.teal,2);
 ln(s,5.38,3.80,5.38,4.59,C.teal,2);ln(s,5.38,4.59,5.74,4.59,C.teal,2);
 // Pulldown at the GATE node to ground
 ln(s,5.11,3.80,5.11,5.03,C.orange,1.8);box(s,4.75,4.90,.80,.37,C.pale);tx(s,'10 kΩ',4.86,5.01,.61,.17,{size:9.4,bold:true});ln(s,5.11,5.28,5.11,5.66,C.grey,1.3);small(s,'GND',4.77,5.76,.90);
 // Drain -> motor, source -> shared ground
 ln(s,6.46,3.46,6.46,4.22,C.ink,2);ln(s,6.46,4.99,6.46,5.65,C.ink,2);small(s,'GND',6.07,5.75,.8);
 // +5 motor bus -> top of motor and flyback diode cathode
 ln(s,6.46,2.56,6.46,2.91,C.orange,2);
 tx(s,'+5 V motor rail',5.82,2.24,1.96,.22,{size:11,color:C.orange,bold:true});
 ln(s,6.46,2.62,7.52,2.62,C.orange,2);ln(s,7.52,2.62,7.52,3.25,C.orange,1.6);
 box(s,7.28,3.22,.48,.46,C.pale);tx(s,'D',7.43,3.32,.17,.18,{size:10.5,bold:true});
 ln(s,7.52,3.68,7.52,4.08,C.ink,1.5);ln(s,7.52,4.08,6.46,4.08,C.ink,1.5);
 tx(s,'Flyback diode (D): cathode to +5 V, anode to MOSFET drain.',.97,5.06,3.64,.58,{size:12.2,color:C.grey});
 box(s,8.43,2.05,4.11,4.47,C.white);small(s,'CRITICAL WIRING NOTES',8.69,2.29,3.56,C.teal);
 bullet(s,'USB 5 V to UNO; independent protected 5 V branch for motors.',8.67,2.79,3.54,11.2);
 bullet(s,'Motor branch shares ground with UNO; never feed motor from GPIO.',8.67,3.65,3.54,11.2);
 bullet(s,'220 Ω series gate, 10 kΩ gate pulldown, diode per motor.',8.67,4.49,3.54,11.2);
 bullet(s,'100 nF local + bulk 100–470 μF supply filtering.',8.67,5.34,3.54,11.2);
}
//12
{
 let s=newslide(12,'Procurement','A sourced bill of materials, without made-up prices','Retail quotes are public, dated references; actual purchase invoices and final module choices remain team-owned evidence.', '[R11] Price check: 25 Oct 2026');
 let r=[['UNO EK R4 Minima','1','₹999','Quoted listing'],['HC-SR04','3','₹79 × 3','Quoted listing'],['ERM coin motor (8 mm)','3','₹64 × 3','Comparable variant'],['AO3400 N-MOSFET','3','₹3.08 × 3','Candidate only'],['ESP32-CAM / MPU6050 / PB400 Pro','1 each','—','Unquoted / owned'],['Diodes / R / caps / mounts','lot','—','Cost to confirm'],['Compute host (laptop)','1','excluded','Not wearable BOM']];
 box(s,.75,2.08,11.79,.47,C.ink);['COMPONENT','QTY','INDICATIVE PRICE','EVIDENCE'].forEach((e,i)=>tx(s,e,[.96,5.06,6.27,9.54][i],2.22,[4.1,1.03,2.94,2.58][i],.20,{size:10.4,color:C.white,bold:true}));
 r.forEach((e,i)=>{let y=2.60+i*.45;box(s,.75,y,11.79,.42,i%2===0?'E7EFEB':C.white);tx(s,e[0],.98,y+.08,3.95,.26,{size:11.5,bold:true});tx(s,e[1],5.11,y+.08,.94,.26,{size:11.3});tx(s,e[2],6.29,y+.08,2.96,.26,{size:11.3});tx(s,e[3],9.55,y+.08,2.65,.26,{size:11.1,color:C.grey});});
 box(s,.81,6.08,11.70,.62,C.mint);tx(s,'Quoted-line subtotal = ₹1,437.24; this is NOT the finished device cost. Camera, wiring, mounting, power and compute still require pricing.',1.01,6.18,11.25,.42,{size:11.2,color:C.deep,bold:true});
}
//13
{
 let s=newslide(13,'Comparison','Why this concept may be worth building','We compare function and constraints, not unsupported claims of superiority or inaccurate commercial prices.', '[R3] [R4]');
 const headings=['APPROACH','GOOD AT','LIMITATION / OPPORTUNITY'];
 box(s,.76,2.11,11.76,.48,C.ink);[.96,4.57,8.04].forEach((x,i)=>tx(s,headings[i],x,2.24,i===2?4.13:3.08,.22,{size:10.5,color:C.white,bold:true}));
 const rows=[['White cane','Direct contact / surface cues','May not convey advance lateral motion information'],['Ultrasonic-only wearable','Low-cost direct range to selected direction','Beam geometry, cross-talk, acoustic target dependence'],['Camera + audio cues','Can identify candidate object classes','Competes with environmental hearing and speech'],['Our proposed haptic layer','Quiet spatial cues + speed-adaptive preview','Must prove latency, interpretability and reliable danger detection']];
 rows.forEach((e,i)=>{let y=2.63+i*.83;box(s,.75,y,11.77,.78,i===3?C.mint:C.white);tx(s,e[0],.96,y+.15,3.42,.30,{size:13,bold:true});tx(s,e[1],4.56,y+.12,3.22,.48,{size:11.9});tx(s,e[2],8.04,y+.12,4.07,.50,{size:11.7,color:C.grey});});
 tx(s,'Differentiator to verify: can volunteers identify direction accurately with fewer confusing alerts under defined test conditions?',.96,6.39,11.28,.42,{size:12.4,color:C.deep,bold:true});
}
//14
{
 let s=newslide(14,'Maker record','Here is the work that is actually reproducible','The submission can include genuine software assets now; photographs and laboratory measurements must be attached by their authors.', 'Repository: source/tests available');
 box(s,.72,2.08,5.84,3.86,C.ink);
 small(s,'TEST OUTPUT / RUN ON 25 OCT 2026',.98,2.36,5.1,'BCDCD1');
 const testout='test_adaptive_design_equation ..... ok\ntest_gate_counts_valid .......... ok\ntest_low_confidence_suppressed ... ok\ntest_metric_is_explicit ......... ok\ntest_relative_cue .............. ok\ntest_serial_packet ............. ok\ntest_temporal_attack_release .... ok\ntest_three_sectors ............. ok\n\nRan 8 tests — OK';
 tx(s,testout,.98,2.82,5.12,2.64,{size:11.6,color:'E5EEE8',fontFace:'Consolas',breakLine:false});
 box(s,6.92,2.09,5.55,1.02,C.white);tx(s,'Host-side controller',7.19,2.30,4.96,.29,{size:14,bold:true});tx(s,'src/hazard_logic.py + tests',7.19,2.69,4.93,.23,{size:11.5,color:C.grey});
 box(s,6.92,3.34,5.55,1.02,C.white);tx(s,'Actuator firmware',7.19,3.54,4.96,.30,{size:14,bold:true});tx(s,'firmware/arduino_haptics/*.ino',7.19,3.95,4.93,.22,{size:11.5,color:C.grey});
 box(s,6.92,4.60,5.55,1.02,C.white);tx(s,'Full traceability',7.19,4.80,4.96,.30,{size:14,bold:true});tx(s,'BOM, risk register, protocol, references',7.19,5.22,4.93,.22,{size:11.5,color:C.grey});
 tx(s,'GitHub repository: https://github.com/YOUR-TEAM/YOUR-REPO',7.19,5.73,5.04,.18,{size:9.4,color:C.teal,bold:true});
 tx(s,'Critical next evidence: timestamped hardware video, annotated perception output, raw latency measurements, and team lab photographs.',.89,6.29,11.73,.44,{size:12.1,color:C.red,bold:true});
}
//15
{
 let s=newslide(15,'Safety','Designing for failure is part of the invention','A warning aid must not appear confident when its sensors or compute pipeline are uncertain.', '[R4] [R8]');
 const data=[['Camera occluded / glare','Missed hazard','Stale-frame detection; retain cane and a separate status mode'],['Latency spike / Wi-Fi lag','Late directional cue','Timestamp rejection; profile p95 end-to-end delay'],['Model false positives','Alarm fatigue','Tracking persistence and logged false alerts/hour'],['Serial loss / motor latch','Wrong prolonged vibration','UNO 500 ms watchdog + 10k gate pulldowns'],['Bad power / heat / cable snag','Injury or lost output','Separate motor rail, protection, secure quick-release mounting']];
 box(s,.77,2.05,11.76,.45,C.ink);[['FAILURE MODE',.96,3.15],['CONSEQUENCE',4.40,3.02],['ENGINEERING RESPONSE',7.52,4.79]].forEach(q=>tx(s,q[0],q[1],2.18,q[2],.24,{size:10.7,bold:true,color:C.white}));
 data.forEach((e,i)=>{let y=2.54+i*.68;box(s,.77,y,11.76,.64,i%2?C.white:'E8EFEC');tx(s,e[0],.96,y+.12,3.18,.38,{size:11.5,bold:true});tx(s,e[1],4.40,y+.12,2.86,.38,{size:11.2,color:C.red});tx(s,e[2],7.52,y+.09,4.69,.50,{size:11.0});});
 box(s,.87,6.17,11.53,.50,C.palered);tx(s,'No ISO / IEC certification, pedestrian safety approval or clinical claim is asserted.',1.05,6.27,11.0,.25,{size:12,color:C.red,bold:true});
}
//16
{
 let s=newslide(16,'Validation','How a judge can reproduce the core claims','We will collect raw measurements before declaring speed, accuracy, battery endurance or safety improvement.', 'Test protocol and blank logs in repository');
 const runs=[
  ['A / POWER','3 motors on/off, max rail current, MCU brownouts','DMM + power trace'],
  ['B / CHANNELS','30 randomized L/C/R cues per volunteer','Confusion matrix'],
  ['C / TIMING','Capture-to-motor onset with time markers','Median + p95 ms'],
  ['D / PERCEPTION','Marked obstacle scenes, moving + static','Recall + false alerts/h'],
  ['E / WALK','Supervised course vs regular cane procedure','Contacts + time + usability']];
 runs.forEach((it,i)=>{let y=2.07+i*.85;box(s,.79,y,11.67,.76,C.white);tag(s,it[0],1.05,y+.20,1.63,C.mint);tx(s,it[1],3.09,y+.17,6.35,.35,{size:12.7,bold:true});tx(s,it[2],9.48,y+.17,2.58,.34,{size:11.1,color:C.grey});});
 tx(s,'Ethics note: no unsupervised blindfold test or on-road human subject test. Consent and institutional review before any high-risk participant testing.',.90,6.48,11.55,.34,{size:10.5,color:C.red});
}
//17
{
 let s=newslide(17,'Constraints','Four engineering bottlenecks we cannot ignore','These are the reasons the prototype is staged, measured and candid about its limits.', '[R6] [R7] [R9]');
 let r=[['01','Inference is slow on modest compute','Run YOLO at reduced resolution, profile p95 latency, downgrade to simpler tracking if needed.'],['02','Relative depth has no stable metric scale','Use calibrated range only in narrow overlapping field; otherwise motion and sector cues only.'],['03','Fast head turns masquerade as approach','Reject uncertain frames; use IMU/camera motion compensation before TTC claims.'],['04','A wearable camera is not yet a wearable AI computer','Laptop demonstrates sensing/control first; select portable processor after power/latency tests.']];
 r.forEach((it,i)=>{let x=.77+(i%2)*6.05,y=2.12+Math.floor(i/2)*1.95;box(s,x,y,5.71,1.68,C.white);tag(s,it[0],x+.22,y+.22,.49,C.pale,C.ink);tx(s,it[1],x+.82,y+.19,4.53,.43,{size:13.2,bold:true});tx(s,it[2],x+.28,y+.82,5.06,.66,{size:11.8,color:C.grey,valign:'top'});});
}
//18
{
 let s=newslide(18,'Roadmap','A four-month route from design to demonstrable hardware',"Milestones are keyed to the award’s October–December prototype window and January review schedule.", '[R1]');
 let months=[['OCT 2026','Design freeze','Pin map, host–MCU interface, BOM, risk register'],['NOV 2026','Build + electrical tests','Wrist band, wiring, current and timeout measurement'],['DEC 2026','Integrated demo','Live video → tracking → L/C/R motors + raw timing logs'],['JAN 2027','Refinement','Usability review, field-risk assessment, portable-host decision']];
 months.forEach((r,i)=>{let x=.77+i*3.12;box(s,x,2.14,2.90,3.50,i===2?C.mint:C.white);tag(s,r[0],x+.21,2.38,2.45,i===2?C.pale:'E9EEEA');tx(s,r[1],x+.23,3.08,2.42,.51,{size:18,serif:true,bold:true});tx(s,r[2],x+.23,4.10,2.40,.79,{size:12.1,color:C.grey,valign:'top'});});
 box(s,.78,5.94,11.73,.53,C.ink);tx(s,'Stage 3 gate = end-to-end *physical* L / C / R demonstration + timestamped latency and safety evidence.',1.08,6.07,11.12,.28,{size:12.1,color:C.white,bold:true});
}
//19
{
 let s=newslide(19,'Stage 2 handover','What is in this submission, and what only the team can authenticate','Honest evidence labels strengthen the submission; a reviewer should not have to guess what was actually built.', '[R1]');
 let rows=[['VERIFIED EXTERNAL SOURCES','Literature, board pin ratings, contest criteria, dated retailer examples'],['REPRODUCIBLE DIGITAL ASSETS','Source scripts, firmware, eight passing code tests, design and protocol documents'],['ENGINEERING PROPOSAL','Speed-adaptive controller; haptic band and camera placement; safe wiring'],['TEAM-OWNED EVIDENCE PENDING','IDs, actual maker photographs, component invoices, physical assembly, latency video'],['STAGE 3 COMMITMENT','Close the loop on real hardware, prove metrics in measured trials']];
 rows.forEach((r,i)=>{let y=2.08+i*.86;box(s,.80,y,11.72,.78,i%2?C.white:'E8EEEA');box(s,.81,y,.075,.78,i===3?C.orange:C.teal);tx(s,r[0],1.07,y+.15,3.34,.34,{size:12.7,bold:true,color:i===3?C.red:C.deep});tx(s,r[1],4.49,y+.15,7.49,.44,{size:12.1});});
}
//20 evidence and source
{
 let s=newslide(20,'References','Technical sources & audit trail','Primary sources for both the proposed design and the evidence standards. Full URLs are also in the GitHub package.', 'Checked 25 Oct 2026');
 const left=[
 '[R1] Vishwakarma Awards (2026–27), official rules and themes.',
 '[R2] WHO (2026), Blindness and vision impairment.',
 '[R3] Abidi et al. (2024), Heliyon 10:e31825, doi:10.1016/j.heliyon.2024.e31825.',
 '[R4] Kappers et al. (2024), IEEE Trans Haptics, doi:10.1109/TOH.2024.3405551.',
 '[R5] Lian et al. (2024), Disabil Rehabil Assist Technol, doi:10.1080/17483107.2023.2227224.',
 '[R6] Yang et al. (2024), Depth Anything V2, NeurIPS / arXiv:2406.09414.'
 ];
 const right=[
 '[R7] Ultralytics: YOLOv8 models and tracking documentation.',
 '[R8] Arduino: UNO R4 Minima official datasheet.',
 '[R9] Espressif: ESP32-S3-EYE development board guide.',
 '[R10] HC-SR04 generic manufacturer / module manual.',
 '[R11] Robu: dated catalogue prices for UNO, HC-SR04, ERM motors and MOSFETs.',
 '[R12] Raspberry Pi: Raspberry Pi 5 technical product brief.'
 ];
 box(s,.76,2.04,5.77,4.37,C.white);box(s,6.77,2.04,5.77,4.37,C.white);
 const leftUrls=['https://www.vishwakarma-awards.org/','https://www.who.int/news-room/fact-sheets/detail/blindness-and-visual-impairment/','https://doi.org/10.1016/j.heliyon.2024.e31825','https://doi.org/10.1109/TOH.2024.3405551','https://doi.org/10.1080/17483107.2023.2227224','https://arxiv.org/abs/2406.09414'];
 left.forEach((z,i)=>tx(s,z,1.04,2.30+i*.65,5.21,.46,{size:11.6,color:C.ink,valign:'top',hyperlink:{url:leftUrls[i]}}));
 const rightUrls=['https://docs.ultralytics.com/models/yolov8','https://github.com/arduino/docs-content/blob/main/content/hardware/uno/boards/uno-r4-minima/datasheet/datasheet.md','https://docs.espressif.com/projects/esp-board-manager/en/latest/references/boards/esp32_s3_eye.html','https://robu.in/wp-content/uploads/2020/02/edited_HC-SR04-User-Manual-1-converted-converted.pdf','https://robu.in/product-category/vibration-motor/','https://robu.in/wp-content/uploads/2025/01/raspberry-pi-5-product-brief.pdf'];
 right.forEach((z,i)=>tx(s,z,7.02,2.30+i*.65,5.23,.46,{size:11.6,color:C.ink,valign:'top',hyperlink:{url:rightUrls[i]}}));
 tx(s,'Full clickable URLs: docs/REFERENCES.md • Unit-test output: evidence/results • Actual maker files to be supplied by team.',.92,6.60,11.57,.32,{size:10.3,color:C.grey});
}
//21 summary
{
 let s=pptx.addSlide();s.background={color:C.ink};box(s,0,0,sw,.15,C.orange);small(s,'STAGE 2 / THE PROPOSITION',.82,.69,5.65,'B8D6CB');
 tx(s,'Three tactile directions.\nOne earlier decision.',.82,1.35,11.5,1.60,{size:41,serif:true,color:C.white,bold:true});
 tx(s,'A buildable, testable warning layer for pedestrians with visual impairment — designed around real sensor uncertainty and the timing of the next human step.',.84,3.28,11.34,.95,{size:20,color:'DEE9E5'});
 ln(s,.87,4.65,12.0,4.65,'416365',2);
 tx(s,'Our proof point for the next round',.88,5.03,5.22,.39,{size:14,bold:true,color:'D3EDE4'});
 tx(s,'Video in  →  timely L / C / R vibration out  →  real measured evidence',.88,5.57,11.0,.40,{size:18,bold:true,color:C.white});
 tx(s,'Repository link: ADD VERIFIED PUBLIC URL AFTER UPLOAD   •   Application/team identity: ENTER REGISTERED DETAILS',.86,6.85,11.85,.24,{size:9.5,color:'D6A893'});
}
pptx.writeFile({fileName:'/mnt/data/Vishwakarma_Stage2_Final_Engineering_Submission.pptx'});

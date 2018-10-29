window.whatInput = (function() {

  'use strict';

  /*
    ---------------
    variables
    ---------------
  */

  // array of actively pressed keys
  var activeKeys = [];

  // cache document.body
  var Trt;veKlache det( l ci).hid
emalue tcowymaxLeuffer timer is runningt;veKlacuffer = falsedet( l ctnt.last u  vaiunctitypet;veKlacurr  vfunctionnulldet( l c`iunct`itypesctnat.bon'tys ceptitextt;veKlanonTypingfunct  // -----'button',-----'entckbox',-----'file',-----'image',-----'radio',-----'reset',-----'submit'---cache docdetect vers  'ely mot';
wheel ev  vowy u  he docvia https://dev loper.mozilla.org/en-US/bods/Web/Ev  vs/wheelt;veKlamot';Wheel =cdetectWheel()ache doclist ly modifier r ac commond ku  vawithctnt.mot';
andhe documn b;

afed kignor vawy eysv  vofalse r aboardcdetect  't;veKlaignor Map // -----16, docshift-----17, doccontrol-----18, docalt-----91, docWtInpus r a ocleft Apple cmd-----93  docWtInpus 
  u ocright Apple cmd---cache docmapping ly sv  vsawy iunctitypectiveKeyiunctMap //{-----'r anpun':-'r aboard',-----'r aup':-'r aboard',-----'mot';npun':-'mot';',-----'mot';move':-'mot';',-----'MSPointerDpun':-'pointer',-----'MSPointerMove':-'pointer',-----'pointerdpun':-'pointer',-----'pointermove':-'pointer',-----'wymaxstart':-'wymax'---}ache docaddccorr ct mot';
wheel ev  vomapping wy `iunctMap`he iunctMap[detectWheel()] //'mot';';ray of actively pll u  vaiunctitypectiveKeyiunctTypesc// cache docmapping ly r a codesawy a common namet;veKlar aMap //{-----9:-'wab',-----13:-'enter',-----16:-'shift',-----27:-'esc',-----32:-'spac;',-----37:-'left',-----38:-'up',-----39:-'right',-----40:-'dpun'---}ache docmap ly IE 10 pointer sv  vst;veKlapointerMap //{-----2:-'wymax',-----3:-'wymax', l ctreat.penclikeowymax-----4:-'mot';'---}ache docwymaxLeuffer timert;veKlatimerach ---------------
    variables) {

  '------------
  */

  // array of allpus sv  vsawnat.ar;
alsoctrigger vawy b;
filter vaoctifor `wymaxstart`he ) {

  ' sv  vBufferuse s----chidrTimer()ac----setfunct(sv  v)ache  acuffer = alueac----timer =awiInputsetTimeoct() {

  'use s  e  acuffer = falsedee  a}, 650)ac--}
he ) {

  ' cufferedEv  v(sv  v)e s  e tco(!cuffer)-setfunct(sv  v)ac--}
he ) {

  ' unBufferedEv  v(sv  v)e s  e chidrTimer()ac----setfunct(sv  v)ac--}
he ) {

  ' chidrTimer()e s  e wiInputchidrTimeoct(timer)ac--}
he ) {

  ' setfunct(sv  v)e s  e eKlasv  v;

 = r a(sv  v)ac--e eKlavalue = iunctMap[sv  v.type];s  e tco(value ===-'pointer')avalue = pointerType(sv  v)ache  adocdon'tydy anything tcownt.value matentsownt.iunctitype
already sets  e tco(curr  vfuncti!==-valuese s  e  aeKlasv  vTargetiontarget(sv  v)ac--e  aeKlasv  vTargetNodeionsv  vTarget.nodeName.toLowerCase()ac--e  aeKlasv  vTargetTypeion(sv  vTargetNodeio==-'iunct')a?nsv  vTarget.getAttribute('type')a:nnulldet(   e tco(t(   e   (docond ktcownt.t';r flag wy allpuityping tniform
fields isn'tysets  e     !che .hasAttribute('data- = (iunct-formtyping')a&&
s  e     docond ktcocurr  vfunctihas a values  e     curr  vfuncti&&
s  e     docond ktcownt.iunctiis `r aboard`s  e     value ===-'r aboard'i&&
s  e     docnotktcownt.r a is `TAB`s  e     r aMap[sv  v;

]i!==-'wab'i&&
s  e     docond ktcownt.target is aiform
iunctitnat.a ceptsitextt;v  e   (t;v  e      sv  vTargetNodeio==-'textar;a' ||t;v  e      sv  vTargetNodeio==-'select' ||t;v  e      (sv  vTargetNodeio==-'iunct'i&&anonTypingfunct .iInexOf(sv  vTargetType) < 0)t;v  e   )) || (t;v  e     docignor  modifier r act;v  e     ignor Map.iInexOf(sv  v;

) > -1t;v  e   )t;v  e se s  e  a  docignor  r aboardctypings  e  a} else  s  e  a  switchfunct(valuesac--e  a}ee  a}
s  e tco(value ===-'r aboard') log;

 (sv  v;

)ac--}
he ) {

  ' switchfunct(
  /ng)e s  e curr  vfunction
  /ngac--e che .setAttribute('data- = (iunct', curr  vfunct)ache  atco(iunctTypes.iInexOf(curr  vfunct) ===--1)yiunctTypes.push(curr  vfunct)ac--}
he ) {

  ' r a(sv  v)e s  e return (sv  v.r aCode)a?nsv  v.r aCodea:nsv  v.whichac--}
he ) {

  ' target(sv  v)e s  e return sv  v.target || sv  v.srcEle
  vac--}
he ) {

  ' pointerType(sv  v)e s  e tco(typely sv  v.pointerType ===-'number')a s  e  areturn pointerMap[sv  v.pointerType];s  e } else  s  e  areturn (sv  v.pointerType ===-'pen')a?n'wymax'a:nsv  v.pointerType; l ctreat.penclikeowymax-----}c--}
he l cr aboardcloghreaax'e-}c--}urn e  irn (svmax'a:nsv   ) {'
he ) {--'irn (svmaurn (sv  v.p) {sCTa    sv  vTo`sv  vac--}
h; l cl( ' poinier r a.arget(s-'m switcha    sv  vTsplice.arget(s-, 1  vBufferuse s----cho`s-----'v  v)e s hfun--'s

  /*
    -

  ' setf13:-'enter',-- ('righ,mber,  e  a)nier r a. e tco( //{---En (svmax'a:ntchfuncrDpEn (sListen(sv',-----'r aup,chidrTimer()acifier r ahfuncrDpEn (sListen(sv',-----'npun',chidrTimer()acifier rv.srcElr a. e tco(ap //{---En (svmax'a:ntchfuncrDpEn (sListen(sv'  vsawy iuncti,chidrTimer()acifier r ahfuncrDpEn (sListen(sv'ap //{-----'r ,chidrTimer()acifier rv.srcEl{  e     --9:ter',er',----- r ahfuncrDpEn (sListen(sv'npus 
  u ,chidrTimer()acifier r ahfuncrDpEn (sListen(sv'd---cache ,chidrTimer()acifi e     --9dpun'-er',----- r ar a.'ont';move':-'vTar e tcongfunct .iInhfuncrDpEn (sListen(sv't';move':-',---------
  ifier r act;v  e     i--9:ter',adio',--InhfuncrDpEn (sListen(svreset',---,chidrTimer()acifi e   Map[sv  v.poer',----- rhfuncrDpEn (sListen(sv'--91, do,tsetTimeoct() {
);--- rhfuncrDpEn (sListen(sv'--9 a ctsetTimeoct() {
);--- rs

  /*
 rDpEn (sListen(sv'--9 a ctseurn e    vBuffenter sv  vst;veKlapointerMap /utiliti typo./ se- elT funttr:ess Mustt/ on'tys ceptitextt;veKlanonTypingfunct  // -----'button',-----'entckbox',-----'file',-----'image',-----'radio',--se s----cdpun':-'pointyiunctTypes.pureset',-----''onadio''vTars

  /*
 c-'nue) {

  e  iv s  ier r a'adio''v:---'Me  .pubrpenept support "adio'"i e     s

  /*
 onresetonTypim swu`svfineuf?unct .iIn'resetonTyp'v:---'ge'kithttp',--support numcufst "resetonTyp"unct .iIn'DOMMesetScroll'pe ==let'r ass  /    varemairrayubrpenept ---4ol  . FirefoxvBuffenter sv  vst;veKlapointerMap /irrt
--- rs
 vTare':- scriptwu`lessubrpenepco(tsv  v)mure':d2:-'sp:-'mopass(svr apolyf---t ---4us 
ypo./ se- elT funttr:ess Musteionsv  v'rDpEn (sListen(s'vTar e tco&
s v  vArget.proto v.rTo`sv  v
pingfu e   Mapownt.iudom `r alue = iue = ialue = i(scriptwwwntplaceuf vabottom tt;<hfun>)nier r a.s

  /*
    -vmax'a:ntcho`s-----'v fi e   Mapot.irwilanoair timet.iudom t  loadi(scriptwwwntplaceufTart.iu<he =>)nier v.srcEle
  vac-s

  /*
 rDpEn (sListen(sv'DOMCont (sLoaded ,cho`s-----'ifier rvvBuffenter sv  vst;veKlapointerMap /apiypo./ se- elT funttr:ess Mustypes.pufu e   Mapypes.ps  e  a :rt.iu  e cur = [];

  // c /ask: ;
filter vaotypes.pu  e curr  vf; },u e   Mapypes.ps arget:u  e curue window.whatInpuvalues: ;
filter vaotypes.pua    sv  v; },u e   Mapypes.ps arget:untert.iudpun':-----'wymaxstart' maxsta: ;
filter vaotypes.pufunct(
  /; },u e   Maplue ===- e  a :rmanunte iuncv  v)ac--e eKla e   unc:docignor  r 
,-----}()ifi
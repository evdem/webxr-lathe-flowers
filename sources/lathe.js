// MIT License, Evgeny Demidov, 2021
import * as THREE from "https://threejs.org/build/three.module.js";

var name, colTex,  texture;
var mesh,  morphPos, morphNorm;
var l0, l1,  bn, nfi;
var theta,  cosTh, sinTh, xTransl, yTransl;
var pos = [], uv = [], ind = [],  offset;
var bi = [new Float32Array(1000), new Float32Array(1000), new Float32Array(1000)]; // 1000 ?

const rose = {
CPpetals: [
[0.00,0.00,0.60, 0.32,0.24,0.60, 0.02,0.61,0.60, 0.01,0.62,0.00],
[0.06,0.00,0.31, 0.42,0.17,0.69, 0.29,0.57,0.35, 0.60,0.70,0.00],
[0.11,0.00,0.30, 0.52,0.20,0.58, 0.47,0.40,0.35, 0.87,0.10,0.00]],
CPsepals: [
[0.12,0.00,0.66, 0.31,0.46,0.65, 0.01,0.63,0.59, 0.00,0.65,0.00],
[0.12,0.00,0.43, 0.24,0.13,0.43, 0.57,0.19,0.17, 0.70,0.15,0.00],
[0.12,0.00,0.38, 0.30,0.01,0.33, 0.54,-0.02,0.26, 0.71,-0.13,0.00]],
petals: {n:21, sco: 0.95, sc: 0.05, ao: 0, a: 1, tooth: 0, fi: 2.4},
sepals: {n:5, sco: 1, sc: 0.1, ao: 0.8, a: 0.2, tooth: 0, fi: 2.4},
nfiHead: 18, hHead: 0.03, rHead: 0.03, roCone: 0.05, rCone: 0.13, hCone: 0.2,
nfiStem: 12, roStem: .04, ntStem: 12,  toothLeaf: 0,
bn: 12, nfi: 9
}

const rose2 = {
CPpetals: [
[0.00,0.01,0.50, 0.32,0.25,0.59, 0.00,0.59,0.90, 0.01,0.59,0.00],
[0.06,0.00,0.30, 0.42,0.26,0.31, 0.59,0.62,0.48, 0.60,0.64,0.10],
[0.11,0.02,0.49, 0.63,0.38,0.26, 0.69,0.03,0.34, 0.67,0.00,0.00]],
CPsepals: [
[0.12,0.00,0.66, 0.31,0.46,0.65, 0.01,0.63,0.59, 0.00,0.65,0.00],
[0.12,0.00,0.43, 0.52,0.31,0.43, 0.66,0.25,0.17, 0.76,0.12,0.00],
[0.12,0.00,0.38, 0.36,0.09,0.33, 0.52,0.07,0.26, 0.50,-0.14,0.00]],
petals: {n:25, sco: 0.95, sc: 0.05, ao: 0, a: 1, tooth: 0, fi: 2.4},
sepals: {n:5, sco: 1, sc: 0.1, ao: 0.8, a: 0.2, tooth: 0, fi: 2.4},
nfiHead: 18, hHead: 0.03, rHead: 0.03, roCone: 0.05, rCone: 0.13, hCone: 0.2,
nfiStem: 12, roStem: .04, ntStem: 12,  toothLeaf: 0,
bn: 12, nfi: 9
}

const daisy = {
CPpetals: [
[0.10,0.00,0.19, 0.20,0.17,0.14, 0.00,0.34,0.25, 0.00,0.35,0.00],
[0.10,0.00,0.19, 0.27,0.27,0.09, 0.52,0.48,0.04, 0.52,0.48,0.00],
[0.10,0.00,0.19, 0.45,0.13,0.09, 0.66,-0.07,0.04, 0.66,-0.07,0.00]],
CPsepals: [
[0.09,-0.04,0.43, 0.28,0.16,0.36, 0.01,0.42,0.69, 0.00,0.42,0.00],
[0.09,-0.04,0.42, 0.28,0.13,0.40, 0.49,0.19,0.17, 0.72,0.21,0.00],
[0.09,-0.04,0.42, 0.30,-0.01,0.36, 0.40,-0.09,0.22, 0.51,-0.26,0.00]],
petals: {n:21, sco: 0.95, sc: 0.05, ao: 0.9, a: 0.1, tooth: 0, fi: 2.4},
sepals: {n:5, sco: 1, sc: 0.1, ao: 0.8, a: 0.2, tooth: 0, fi: 2.4},
nfiHead: 18, hHead: 0.03, rHead: 0.1, roCone: 0.05, rCone: 0.1, hCone: 0.2,
nfiStem: 12, roStem: .04, ntStem: 12,  toothLeaf: 1,
bn: 12, nfi: 9
}

const tulip = {
CPpetals: [
[0.05,0.0,0.42, 0.36,0.55,0.34, 0.01,0.74,0.54, 0.00,0.74,0.03],
[0.05,0.0,0.45, 0.42,0.19,0.45, 0.28,0.80,0.47, 0.28,0.81,0.05],
[0.05,0.0,0.47, 0.49,0.11,0.47, 0.37,0.83,0.57, 0.52,0.81,0.06]],
petals: {n:5, sco: 0.95, sc: 0.05, ao: 0.98, a: 0.02, tooth: 0, fi: 2.4},
sepals: {n: 0},
nfiHead: 18, hHead: 0.3, rHead: 0.05, roCone: 0.03, rCone: 0.05, hCone: 0.1,
nfiStem: 12, roStem: .04, ntStem: 12,  toothLeaf: 0,
bn: 12, nfi: 9
}

const tooth = {
CPpetals: [
[0.08,0.01,0.30, 0.22,0.15,0.27, 0.01,0.34,0.62, 0.00,0.35,0.00],
[0.08,0.01,0.38, 0.25,0.21,0.66, 0.41,0.42,0.22, 0.66,0.41,0.00],
[0.08,0.01,0.38, 0.26,0.11,0.66, 0.56,0.14,0.22, 0.80,-0.02,0.00]],
CPsepals: [
[0.08,0.00,0.64, 0.28,0.16,0.36, 0.01,0.39,0.76, 0.00,0.42,0.00],
[0.08,0.00,0.69, 0.26,0.19,0.44, 0.60,0.09,0.20, 0.70,0.01,0.00],
[0.08,0.00,0.69, 0.39,0.13,0.44, 0.56,-0.08,0.27, 0.76,-0.26,0.00]],
petals: {n: 11, sco: .9, sc: .1, ao: .8, a: .2, tooth: 1, fi: 2.4},
sepals: {n: 8, sco: .95, sc: .05, ao: .8, a: .2, tooth: 1, fi: 2.4},
nfiHead: 18, rHead: .08, hHead: .05, rCone: .08, roCone: .03, hCone: .15,
nfiStem: 12, roStem: .04, ntStem: 12,  toothLeaf: 1,
bn: 15, nfi: 15
}

const tooth2 = {
CPpetals: [
[0.02,0.00,0.28, 0.28,0.21,0.25, 0.00,0.50,0.42, 0.00,0.50,0.00],
[0.03,0.00,0.27, 0.26,0.07,0.27, 0.29,0.31,0.30, 0.44,0.49,0.10],
[0.03,0.00,0.27, 0.35,0.00,0.27, 0.47,0.34,0.34, 0.78,0.34,0.18]],
CPsepals: [
[0.03,-0.03,0.59, 0.34,0.22,0.21, 0.01,0.59,0.88, 0.00,0.54,0.00],
[0.03,-0.03,0.66, 0.31,0.16,0.55, 0.48,0.16,0.17, 0.63,-0.02,0.00],
[0.03,-0.03,0.69, 0.23,0.04,0.43, 0.34,-0.01,0.15, 0.54,-0.13,0.00]],
petals: {n: 11, sco: .9, sc: .1, ao: .8, a: .2, tooth: 2, fi: 2.4},
sepals: {n: 8, sco: .95, sc: .05, ao: .8, a: .2, tooth: 0, fi: 2.4},
nfiHead: 18, rHead: .03, hHead: .05, rCone: .04, roCone: .03, hCone: .15,
nfiStem: 12, roStem: .04, ntStem: 12,  toothLeaf: 0,
bn: 15, nfi: 15
}

const apple = {
CPpetals: [
[0.09,0.00,0.30, 0.23,0.20,0.25, 0.01,0.40,0.87, 0.00,0.42,0.00],
[0.09,0.00,0.39, 0.37,0.21,0.28, 0.41,0.55,0.43, 0.41,0.55,0.00],
[0.09,0.00,0.39, 0.54,0.06,0.28, 0.70,0.30,0.43, 0.69,0.30,0.00]],
CPsepals: [
[0.10,0.00,0.43, 0.28,0.21,0.36, 0.01,0.50,0.83, 0.00,0.47,0.00],
[0.10,0.00,0.42, 0.33,0.10,0.40, 0.52,0.20,0.17, 0.72,0.14,0.00],
[0.10,0.00,0.42, 0.30,0.04,0.36, 0.40,-0.04,0.22, 0.51,-0.21,0.00]],
petals: {n: 5, sco: 0.95, sc: 0.05, ao: 0.9, a: 0.1, tooth: 0, fi: 2.5},
sepals: {n: 5, sco: 1, sc: 0.1, ao: 0.8, a: 0.2, tooth: 0, fi: 2.4},
roCone: 0.04, rCone: 0.11, hCone: 0.2,
nfiHead: 18, rHead: 0.09, hHead: 0.02,
nfiStem: 12, roStem: .04, ntStem: 12,  toothLeaf: 0,
bn: 12, nfi: 9
}

const weed = {
CPpetals: [
[0.02,0.00,0.30, 0.18,0.20,0.25, 0.01,0.42,0.87, 0.00,0.42,0.00],
[0.02,0.00,0.39, 0.25,0.22,0.28, 0.41,0.55,0.43, 0.41,0.54,0.17],
[0.02,0.00,0.39, 0.19,0.22,0.28, 0.64,0.32,0.43, 0.64,0.32,0.19]],
CPsepals: [
[0.03,0.00,0.43, 0.28,0.21,0.36, 0.00,0.47,0.83, 0.00,0.47,0.00],
[0.03,0.00,0.48, 0.23,0.11,0.45, 0.42,0.36,0.49, 0.78,0.47,0.00],
[0.03,0.00,0.48, 0.21,0.12,0.57, 0.56,0.18,0.36, 0.94,0.04,0.00]],
petals: {n: 5, sco: 1, sc: 0.1, ao: 0.9, a: 0.1, tooth: 0, fi: 2.5},
sepals: {n: 5, sco: .9, sc: 0.1, ao: .8, a: .2, tooth: 0, fi: 2.4},
roCone: 0.03, rCone: 0.03, hCone: 0.2,
nfiHead: 18, rHead: 0.03, hHead: 0.03,
nfiStem: 12, roStem: .04, ntStem: 12,  toothLeaf: 0,
bn: 15, nfi: 12
}
//------ "broken" stem
const lily = {
CPpetals: [
[0.03,0.01,0.34, 0.19,0.19,0.46, 0.17,0.52,0.48, 0.00,0.57,0.12],
[0.03,0.01,0.34, 0.25,0.10,0.46, 0.33,0.49,0.54, 0.30,0.57,0.14],
[0.03,0.01,0.34, 0.38,0.03,0.46, 0.56,0.56,0.59, 0.53,0.59,0.12]],
CPsepals: [
[0.03,0.00,0.39, 0.53,0.05,0.66, 0.93,0.03,0.29, 1.00,0.03,0.00],
[0.03,0.00,0.39, 0.53,0.05,0.66, 0.93,0.03,0.29, 1.00,0.03,0.00],
[0.03,0.00,0.39, 0.53,0.05,0.66, 0.93,0.03,0.29, 1.00,0.03,0.00]],
petals: {n: 5, sco: 1, sc: 0.1, ao: 0.8, a: 0.2, tooth: 0, fi: 2.4},
sepals: {n: 3, sco: .7, sc: 0.1, ao: 1, a: 0, tooth: 0, fi: 2.4},
roCone: 0.03, rCone: 0.03, hCone: 0.2,
nfiHead: 18, rHead: 0.03, hHead: 0.3,
nfiStem: 12, roStem: .04, ntStem: 12,  toothLeaf: 0,
bn: 12, nfi: 12
}

const lotus = {
CPpetals: [
[0.03,0.01,0.27, 0.32,0.29,0.26, 0.08,0.59,0.20, 0.00,0.66,0.00],
[0.03,0.00,0.24, 0.42,0.19,0.28, 0.53,0.55,0.13, 0.60,0.74,0.00],
[0.03,0.00,0.21, 0.52,0.21,0.23, 0.47,0.30,0.11, 0.87,0.14,0.00]],
CPsepals: [
[0.03,0.00,0.39, 0.53,0.05,0.66, 0.93,0.03,0.29, 1.00,0.03,0.00],
[0.03,0.00,0.39, 0.53,0.05,0.66, 0.93,0.03,0.29, 1.00,0.03,0.00],
[0.03,0.00,0.39, 0.53,0.05,0.66, 0.93,0.03,0.29, 1.00,0.03,0.00]],
petals: {n: 21, sco: 1, sc: 0.1, ao: 0, a: 1, tooth: 0, fi: 2.4},
sepals: {n: 3, sco: .7, sc: 0, ao: .8, a: .2, tooth: 0, fi: 2.},
roCone: 0.03, rCone: 0.03, hCone: 0.2,
nfiHead: 18, rHead: 0.03, hHead: 0.01,
nfiStem: 12, roStem: .04, ntStem: 12,  toothLeaf: 0,
bn: 12, nfi: 5
}

function nameSet(s){
  switch(s){
    case 'rose': name = rose;  break;
    case 'rose2': name = rose2;  break;
    case 'daisy': name = daisy;  break;
    case 'tooth': name = tooth;  break;
    case 'tooth2': name = tooth2;  break;
    case 'tulip': name = tulip;  break;
    case 'apple': name = apple;  break;
    case 'weed': name = weed;  break;
    case 'lily': name = lily;  break;
    case 'lotus': name = lotus;
  }
}
function colorSet(s){
  switch(s){
    case 'red': colTex = 0;  break;
    case 'yellow': colTex = 0.0625;  break;
    case 'pink': colTex = 0.125;  break;
    case 'white': colTex = 0.1875;  break;
    case 'blue': colTex = 0.25;  break;
    case 'red_yellow': colTex = 0.3125;  break;
    case 'red_white': colTex = 0.375;  break;
    case 'red_white_rand': colTex = 0.4375;  break;
    case 'red_yellow_rand': colTex = 0.5;  break;
    case 'red_yellow_strip': colTex = 0.5626;  break;
    case 'red_white_strip': colTex = 0.625;  break;
    case 'yellow_strip': colTex = 0.6875;  break;
  }
}

// Bud + stem + leaves are merged
function flower(f, age, L0, L1, th, bStem=true, bLeaves=true){
  if(bStem){ // ?
    l0 = L0;  l1 = L1;
    theta = th;  cosTh = Math.cos(th);  sinTh = Math.sin(th);
    xTransl = l1*sinTh;  yTransl = l0 + l1*cosTh;
  }else{
    theta = 0; cosTh = 1; sinTh = 0;  xTransl = 0; yTransl = 0;
  }
  pos = [];  ind = [];  uv = [];  offset = 0; nfi = f.nfi;   bn = f.bn;
  petals( age, f.hCone,  f.CPpetals, f.petals, colTex);
  if(f.sepals.n) sepals( age, f.hCone, f.CPsepals, f.sepals, .876);
  head( f.rHead, f.hHead, f.hCone, f.nfiHead, .9375);
  cone( f.roCone, f.rCone, f.hCone, 0, f.nfiHead, .9);
  if(bStem){
    stem( 0, f.roStem, f.roCone, f.ntStem, f.nfiStem, .9);
    theta = 0; cosTh = 1; sinTh = 0;  xTransl = 0; yTransl = 0;
    if(bLeaves) leaves( 1, 0, f.toothLeaf, .876); // age, y0
  }
  let geometry = new THREE.BufferGeometry();
  geometry.setIndex( ind );
  geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( pos, 3 ) );
  geometry.computeVertexNormals();
  morphPos = geometry.getAttribute( 'position' );
  morphNorm = geometry.getAttribute( 'normal' );
}
function petals(age, y0, CP, p, texOff){
  for(let k = 0; k < 3; k++)  bezier1D(CP[k], bi[k])
  for(let i = 1; i <= p.n; i++ )
    patch(p.fi*i, p.sco + p.sc*i/p.n, age*(p.ao + p.a*i/p.n), y0, p.tooth, texOff );
}
function sepals(age, y0, CP, s, texOff){
  for(let k = 0; k < 3; k++)  bezier1D(CP[k], bi[k])
  for(let i = 1; i <= s.n; i++ )
    patch(s.fi*i, s.sco + s.sc*i/s.n, age*(s.ao + s.a*i/s.n), y0, s.tooth, texOff );
}

function stem(y0, R0, R, nt, nfi, texOff){
  // quadratic Bezier is used with CP = (0,0)  (0,l0)  (l1*sin(th), l0 + l1*cos(th))
  let lx = l1*Math.sin(theta),   ly = l0 + l1*Math.cos(theta);  // stem top point
  let stn = 1/(nt-1),  stFi = 2*Math.PI/(nfi-1);
  for(let t = 0; t < 1.001; t += stn ){
    let x = t*t*lx,  y = y0 + 2*t*(1-t)*l0 + t*t*ly;
    let dx = t*lx,  dy = (1 - t - t)*l0 + t*ly  // tangent vector
    let dlen = Math.sqrt(dx*dx + dy*dy);
    dx /= dlen;  dy /= dlen;   // normal to the spline is (dy, -dx)
    let r = R0 + t*(R - R0);
    for(let fi = 0; fi < 6.3; fi += stFi ){
      let len = r*Math.cos(fi);
      pos.push( x + dy*len,  y - dx*len,  r*Math.sin(fi) );
      uv.push(4* fi/6.283, texOff);
    }
  }
  let t = offset,  tn = offset + nfi;
  for(let i = 0; i < nt-1; i++ ){
    for(let j = 0; j < nfi-1; j++ ){
      ind.push(t++);  ind.push(tn);  ind.push(t);
      ind.push(tn++); ind.push(tn);  ind.push(t);
    }
    t++;  tn++;
  }
  offset += nt*nfi;
}

function leaves(age, y0, tooth, texOff){
  let CP = [   // r, z, fi
[0.03,0.13,0.64,0.05,0.19,0.36,0.28,0.33,0.76,0.42,0.66,0.00],
[0.03,0.08,0.69,0.06,0.14,0.44,0.50,0.51,0.20,0.66,0.35,0.00],
[0.03,0.05,0.68,0.28,0.03,0.24,0.56,0.29,0.38,0.81,0.12,0.00]
  ]
  for(let k = 0; k < 3; k++)  bezier1D(CP[k], bi[k])
  for(let i = 0; i < 3; i++ ){
    patch(2*i+5, 1.5, age*.5*i, y0, tooth, texOff ); // fi0, scaleR, age
  }
}

function patch(fi0, scaleR, a, y0, tooth, texOff){
  for(let u = 0; u < bn; u++ ){
    let u3 = 3*u,  a0 = 2*(.5-a)*(1-a), a1 = 4*a*(1-a), a2 = 2*a*(a-.5);
    let r = (a0*bi[0][u3] + a1*bi[1][u3] + a2*bi[2][u3])*scaleR;
    let y = a0*bi[0][u3+1] + a1*bi[1][u3+1] + a2*bi[2][u3+1];
    let fi = 2*(a0*bi[0][u3+2] + a1*bi[1][u3+2] + a2*bi[2][u3+2]);
    fi *= Math.min(1 + .01/r, 2);
    let dfi = 2*fi/(nfi - 1);
    fi += fi0;
    for(let v = 0; v < nfi; v++ ){
      let xi = r*Math.sin(fi),  yi = y + y0;
      let xrot = xi*cosTh + yi*sinTh,  yrot = -xi*sinTh + yi*cosTh;
      pos.push( xrot + xTransl,  yrot + yTransl,  r*Math.cos(fi) );
      uv.push(v/(nfi - 1), .0625* u/bn + texOff); // bn - 1 ?
      let c = .5*Math.abs( 2*v/(nfi-1) - 1 ),  d = 2*c, e = 1 - u/bn;
      fi -= dfi;
    }
  }
  let t = offset,  tn = offset + nfi;
  if(tooth == 0)
    for(let i = 0; i < bn-1; i++ ){
      for(let j = 0; j < nfi-1; j++ ){
        ind.push(t++);  ind.push(t);  ind.push(tn);
        ind.push(tn++); ind.push(t);  ind.push(tn);
      }
      t++;  tn++
    }
  else if(tooth == 1)
    for(let i = 0; i < bn-1; i++ ){
      ind.push(t++);  ind.push(t);  ind.push(++tn);
      for(let j = 0; j < nfi-3; j++ ){
        ind.push(t++);  ind.push(t);  ind.push(tn);
        ind.push(tn++); ind.push(t);  ind.push(tn);
      }
      ind.push(t++);  ind.push(t);  ind.push(tn++);
      t++;  tn++
    }
  else{
    for(let j = 0; j < (nfi-1)/2; j++ ){
      ind.push(tn++);  ind.push(t++);  ind.push(tn);
      ind.push(tn++);  ind.push(++t);  ind.push(tn);
    }
    t++;  tn++
    for(let i = 1; i < bn-1; i++ ){
      for(let j = 0; j < nfi-1; j++ ){
        ind.push(t++);  ind.push(t);  ind.push(tn);
        ind.push(tn++); ind.push(t);  ind.push(tn);
      }
      t++;  tn++
    }
  }
  offset += bn*nfi;
}

function cone(R0, R, h, y0, nfi, texOff){
  let stFi = 2*Math.PI/(nfi-1);
  for(let fi = 0; fi < 6.3; fi += stFi ){
    let si = Math.sin(fi),  co = -Math.cos(fi),  ui = 4* fi/6.283;
    let x = R0*si;
    let xrot = x*cosTh + y0*sinTh,  yrot = -x*sinTh + y0*cosTh;
    pos.push( xrot + xTransl,  yrot + yTransl,  R0*co );
    x = R*si;
    xrot = x*cosTh + (y0 + h)*sinTh;  yrot = -x*sinTh + (y0 + h)*cosTh;
    pos.push( xrot + xTransl,  yrot + yTransl,  R*co );
    uv.push(ui, texOff, ui, texOff);
  }
  let t = offset;
  for(let j = 0; j < nfi-1; j++ ){
    ind.push(t++);  ind.push(t++);  ind.push(t);
    ind.push(t); ind.push(t-1);  ind.push(t+1);
  }
  offset += 2*nfi;
}

function head(R, h, y0, nfi, texOff){
  let nr = 4, stR = 1/(nr-1), stFi = 2*Math.PI/(nfi-1)
  for(let i = 0; i < nr; i++ ){
    let y = y0 + h*i/nr,  r = R*Math.sqrt(1 - i*stR)
    for(let fi = 0; fi < 6.3; fi += stFi ){
      let x = r*Math.sin(fi);
      let xrot = x*cosTh + y*sinTh,  yrot = -x*sinTh + y*cosTh;
      pos.push( xrot + xTransl,  yrot + yTransl,  r*Math.cos(fi) );
      uv.push(fi/6.283, .125*i/nr + texOff);
    }
  }
  let t = offset,  tn = offset + nfi;
  for(let i = 0; i < nr-1; i++ ){
    for(let j = 0; j < nfi-1; j++ ){
      ind.push(t++);  ind.push(t);  ind.push(tn);
      ind.push(tn++); ind.push(t);  ind.push(tn);
    }
    t++;  tn++;
  }
  offset += nr*nfi;
}

function bezier1D(CP, bi){
   let dt = 1/(bn-1),  t = dt,  j = 3;
   bi[0] = CP[9];   bi[1] = CP[10];   bi[2] = CP[11];
   for (let i = 1; i < bn-1; i++){
     let t2 = t*t,  t1 = 1-t,  t12 = t1*t1;
     let b0 = t*t2,  b1 = 3*t2*t1,  b2 = 3*t*t12,  b3 = t12*t1;
     bi[j++] = b0*CP[0] + b1*CP[3] + b2*CP[6] + b3*CP[9];
     bi[j++] = b0*CP[1] + b1*CP[4] + b2*CP[7] + b3*CP[10];
     bi[j++] = b0*CP[2] + b1*CP[5] + b2*CP[8] + b3*CP[11];
     t += dt;
   }
   bi[j++] = CP[0];   bi[j++] = CP[1];   bi[j++] = CP[2];
}

function makeTexture() {
  const size = 64,  p = Math.PI/(size - 1);
  const cnv = new OffscreenCanvas(size, 16*size);
  const ctx = cnv.getContext('2d');
  const imageData = ctx.getImageData(0, 0, size, 16*size);
  const data = imageData.data;
  let t = 0;
  for (var i = 0; i < data.length/64; i++) { // head  offset = 0.9375,  textures go in reverse order
    data[t++] = data[t++] = 200 + 50*Math.random();
    data[t++] = 0;  data[t++] = 255;
  }
  for (let k = 0; k < size; k++) { // green 0.875
    for (let i = 0; i < size; i++) {
      let c = 100 + 70*Math.abs(Math.cos(p*i));
      data[t++] = 0;  data[t++] = c;  data[t++] = 0;  data[t++] = 255;
    }
  }
  for (let k = 0; k < size; k++) { // red, not used    0.8125
    for (let i = 0; i < size; i++) {
      let c = Math.cos(p*i);
      c = 150 + 100*c*c;
      data[t++] = c;  data[t++] = 0;  data[t++] = 0;  data[t++] = 255;
    }
  }
  for (let k = 0; k < size; k++) { // red, not used  0.75
    for (let i = 0; i < size; i++) {
      let c = Math.cos(p*i);
      c = 150 + 100*c*c;
      data[t++] = c;  data[t++] = 0;  data[t++] = 0;  data[t++] = 255;
    }
  }
  for (let k = 0; k < size; k++) { // yellow_strip  0.6875
    for (let i = 0; i < size; i++) {
      let c = 100 + 150*Math.abs(Math.sin(3*p*i));
      data[t++] = 255;  data[t++] = c;  data[t++] = 0;  data[t++] = 255;
    }
  }
  for (let k = 0; k < size; k++) { // red_white_strip  0.625
    for (let i = 0; i < size; i++) {
      let c = Math.min(1 - Math.abs(Math.sin(4*p*i)) + .0004*(size - k)*(size - k), 1);
      c = 250*c;
      data[t++] = 200 + .2*c;  data[t++] = c;  data[t++] = c;  data[t++] = 255;
    }
  }
  for (let k = 0; k < size; k++) { // red_yellow_strip  0.5625
    for (let i = 0; i < size; i++) {
      let c = Math.min(1 - Math.abs(Math.sin(4*p*i)) + .0004*(size - k)*(size - k), 1);
      c = 250*c;
      data[t++] = 200 + .2*c;  data[t++] = c;  data[t++] = 0;  data[t++] = 255;
    }
  }
  for (let k = 0; k < size; k++) { // red_yellow_rand  0.5
    for (let i = 0; i < size; i++) {
      let c = Math.min(1 - Math.sin(p*i) + .0005*Math.random()*(size - k)*(size - k), 1);
      c = 250*c;
      data[t++] = 200 + .2*c;  data[t++] = c;  data[t++] = 0;  data[t++] = 255;
    }
  }
  for (let k = 0; k < size; k++) { // red_white_rand  0.4375
    for (let i = 0; i < size; i++) {
      let c = Math.min(1 - Math.sin(p*i) + .0005*Math.random()*(size - k)*(size - k), 1);
      c = 250*c;
      data[t++] = 200 + .2*c;  data[t++] = c;  data[t++] = c;  data[t++] = 255;
    }
  }
  for (let k = 0; k < size; k++) { // red_white  0.375
    for (let i = 0; i < size; i++) {
      let c = 1 - Math.sin(p*i);
      c = 250*c;
      data[t++] = 200 + .2*c;  data[t++] = c;  data[t++] = c;  data[t++] = 255;
    }
  }
  for (let k = 0; k < size; k++) { // red_yellow  0.3125
    for (let i = 0; i < size; i++) {
      let c = 1 - Math.sin(p*i);
      c = 250*c;
      data[t++] = 200 + .2*c;  data[t++] = c;  data[t++] = 0;  data[t++] = 255;
    }
  }
  for (let k = 0; k < size; k++) { // blue  0.25
    for (let i = 0; i < size; i++) {
      let c = Math.cos(p*i);
      c = 50 + 150*c*c;
      data[t++] = c;  data[t++] = c;  data[t++] = 255;  data[t++] = 255;
    }
  }
  for (let k = 0; k < size; k++) { //  white  0.1875
    for (let i = 0; i < size; i++) {
      let c = Math.cos(p*i);
      c = 250 - 100*c*c;
      data[t++] = c;  data[t++] = c;  data[t++] = 200;  data[t++] = 255;
    }
  }
  for (let k = 0; k < size; k++) { //  pink  0.125
    for (let i = 0; i < size; i++) {
      let c = Math.abs(Math.cos(p*i));
      c = 120 + 100*c;
      data[t++] = 255;  data[t++] = c;  data[t++] = c;  data[t++] = 255;
    }
  }
  for (let k = 0; k < size; k++) { //  yellow 0.0625
    for (let i = 0; i < size; i++) {
      let c = 100 + 70*(Math.sin(3*p*i) + 1);
      data[t++] = 255;  data[t++] = c;  data[t++] = 0;  data[t++] = 255;
    }
  }
  for (let k = 0; k < size; k++) { // red  0
    for (let i = 0; i < size; i++) {
      let c = Math.cos(p*i);
      c = 150 + 100*c*c;
      data[t++] = c;  data[t++] = 0;  data[t++] = 0;  data[t++] = 255;
    }
  }
  ctx.putImageData(imageData, 0, 0);
  texture = new THREE.CanvasTexture( cnv );
};

function flower1(d, age, l0, l1, theta, bLeaves=false){
  nameSet(d.name);  colorSet(d.col);
//   flower(f, age, L0, L1, th, bStem=true, bLeaves=true)
  flower(name, age, l0, l1, theta, true, bLeaves );
  let geom = new THREE.BufferGeometry();
  geom.setIndex( ind );
  geom.setAttribute( 'position', morphPos );
  geom.setAttribute( 'uv', new THREE.Float32BufferAttribute(uv, 2));
  geom.setAttribute( 'normal', morphNorm );

  let mat = new THREE.MeshPhongMaterial({
    map: texture,
    side: THREE.DoubleSide
  })
///  texture.wrapS = THREE.RepeatWrapping;
  mesh = new THREE.Mesh( geom, mat );
  return mesh;
}
function flower3(d){  // Animations
  nameSet(d.name);  colorSet(d.col);
// flower(f, age, L0, L1, th, bStem=true, bLeaves=true)
  flower(name, 0, .1, .1, .7, d.stem );
  let geom = new THREE.BufferGeometry();
  geom.setIndex( ind );
  geom.setAttribute( 'position', morphPos );
  geom.setAttribute( 'uv', new THREE.Float32BufferAttribute(uv, 2));
  geom.setAttribute( 'normal', morphNorm );
  flower(name, .5, 1, .25, 1, d.stem );
  let arPos = [ morphPos ],  arNorm = [ morphNorm ];
  flower(name, 1, 1.5, .5, 1.3, d.stem );
  arPos.push( morphPos );  arNorm.push( morphNorm );
  geom.morphAttributes.position = arPos;
  geom.morphAttributes.normal = arNorm;

  let mat = new THREE.MeshPhongMaterial({
    morphTargets: true,
    morphNormals: true,
    map: texture,
    side: THREE.DoubleSide
  })
  texture.wrapS = THREE.RepeatWrapping;
  mesh = new THREE.Mesh( geom, mat );
  mesh.updateMorphTargets();
  return mesh;
}

export {flower1, flower3, makeTexture}
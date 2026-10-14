(function () {
  // Grid units: 1 cell = 20px. Map is 97 x 77 cells.
  var W = 97, H = 77;
  var LINES = [
    { id: 'R', name: 'Ligne Rouge', color: '#BD1038', pts: [
      ['Hargrove Heights', 18, 8], ['Northgate', 18, 12], ['Pinecrest', 21, 15], [null, 24, 18], ['Maple Ridge', 24, 21], ['Lakeview', 24, 25],
      ['Hargrove Center', 24, 30], ['Elm Park', 24, 34], ['Bayside Ave', 24, 37], [null, 24, 40], ['St. Andrews', 27, 43], ['Wellington Green', 30, 46], [null, 32, 48],
      ['Old Town', 32, 50], ['Market Sq', 32, 53], ['Hôtel de Ville', 32, 57], ['Kingsway', 32, 61], ['Fox Park', 28, 65], ['Ashford', 26, 67], [null, 24, 69], ['Millbrook Sud', 24, 74]] },
    { id: 'O', name: 'Ligne Orange', color: '#DF8600', pts: [
      ['Briar Hill', 4, 72], ['Westbury', 8, 72], [null, 13, 72], ['Halton', 14, 71], ['Lindenwood', 16, 69], ['Cedar Falls', 19, 66], ['Millbrook Center', 22, 63], ['Granville', 25, 60],
      ['Gare Centrale', 28, 57], ['Hôtel de Ville', 32, 57], ['Esplanade', 36, 57], ['Union Yards', 40, 57], ['Southshore', 44, 53], ['Oakwood Gate', 47, 50], ['Bayview Terrace', 50, 47], ['Larkspur', 52, 45], [null, 54, 43],
      ['Oakwood Centre', 54, 40], [null, 54, 38], ['Hawthorne', 57, 35], ['Cypress', 60, 32], ['Oak Hollow', 63, 29], [null, 66, 26], ['Tech Park', 66, 23], ['Oakwood Nord', 66, 19]] },
    { id: 'G', name: 'Ligne Verte', color: '#00B251', pts: [
      ['Pembrook', 2, 45], ['Ridgeway', 5, 45], ['Collins Ave', 8, 45], [null, 12, 45], ['Glenwood', 14, 47], ['Sutton', 17, 50], ['Fairview', 20, 53],
      ['Fox Terrace', 24, 53], ['Albion Sq', 28, 53], ['Market Sq', 32, 53], ['Harbor Point', 38, 53], ['Southshore', 44, 53], ['Kessler', 47, 53], ['Oakwood Pl', 50, 53], [null, 52, 53],
      ['Grafton', 53, 54], ['Brant Hill', 56, 57], ['Westfield Center', 59, 60], [null, 62, 63], ['Seabright', 65, 63], ['Westfield Beach', 68, 63]] },
    { id: 'G2', name: 'Ligne Verte · branche C', color: '#00B251', branch: 'G', pts: [
      ['Weston', 2, 53], ['Brookfield', 5, 53], ['Linden St', 8, 53], ['Halsey', 11, 53], ['Carroll Park', 14, 53], ['Spring St', 17, 53], ['Fairview', 20, 53]] },
    { id: 'G3', name: 'Ligne Verte · branche D', color: '#00B251', branch: 'G', pts: [
      ['Fairview', 20, 53], ['Hollis', 18, 55], ['Wakefield', 16, 57], ['Marston', 14, 59], ['Kendrick', 12, 61], [null, 10, 63], ['Ellery', 6, 63], ['Westmoor', 2, 63]] },
    { id: 'B', name: 'Ligne Bleue', color: '#0896D7', pts: [
      ['Fox Landing', 28, 61], ['Kingsway', 32, 61], ['Civic Center', 36, 61], ['Bowman St', 40, 61], ['Eastgate', 44, 61], [null, 46, 61], ['Mill Pond', 49, 58], ['Grafton', 53, 54],
      ['Orchard Hill', 56, 51], ['Westfield Port', 59, 48], ['Sandpiper', 62, 45], ['Harbor Lights', 65, 42], ['Lakefront', 68, 39], ['Northshore', 68, 35], ['Pelican Bay', 68, 31], [null, 68, 30],
      ['Cliffside', 71, 27], ['Juniper Bluff', 74, 24], ['Cedar Cove', 77, 21], ['Kingfisher', 80, 18], [null, 82, 16], ['Northpoint', 82, 12], ['Peninsula Point', 82, 7]] },
    { id: 'P', name: 'Ligne Violette', color: '#8E10C1', pts: [
      ['Greenleaf', 2, 34], ['Wyndham', 5, 34], ['Corliss', 8, 34], [null, 10, 34], ['Ashby', 12, 36], ['Calder', 15, 39], ['Hargrove Sud', 18, 42], ['Beacon Rd', 21, 45], ['Thornbury', 24, 48], ['Kilburn', 26, 50], [null, 28, 52],
      ['Albion Sq', 28, 53], ['Gare Centrale', 28, 57], ['Fox Landing', 28, 61], ['Fox Park', 28, 65], ['Wexford', 31, 68], ['Holloway', 34, 71], ['Southgate Jct', 36, 73],
      ['Brookhaven', 40, 73], ['Pinewood', 44, 73], ['Elmhurst', 48, 73], ['Dunes Park', 52, 73], ['Westfield Sud', 56, 73], ['Seaside', 60, 73], ['Aquadream Bay', 63, 73]] },
    { id: 'Y', name: 'Ligne Jaune', color: '#F0E000', pts: [
      ['Hargrove Lakeside', 34, 30], ['Shore Rd', 31, 30], ['Birchwood', 28, 30], ['Hargrove Center', 24, 30], ['Oakmont', 21, 33], ['Fernhill', 18, 36], ['Calder', 15, 39], [null, 14, 40],
      ['Crestview', 14, 43], ['Glenwood', 14, 47], ['Carroll Park', 14, 53], ['Marston', 14, 59], ['Ravenna', 14, 65], ['Halton', 14, 71], [null, 17, 74], ['Kingsbury', 20, 74], ['Millbrook Sud', 24, 74],
      ['Riverside Park', 28, 74], [null, 31, 74], ['Holloway', 34, 71]] },
    { id: 'A', name: 'Airport Express', color: '#A2A2A2', pts: [
      ['Gare Centrale', 28, 57], ['Pell St', 22, 57], ['Wakefield', 16, 57], ['Expo Center', 10, 57], [null, 8, 57], ['Aéroport WBY', 4, 61]] },
    { id: 'T', name: 'Tram du littoral', color: '#F28CB1', pts: [
      ['Lakefront', 68, 39], ['Beach Club', 68, 43], ['Lighthouse', 68, 47], ['Marina', 68, 51], ['Sunset Pier', 68, 55], ['Boardwalk', 68, 59], ['Westfield Beach', 68, 63], [null, 68, 66],
      ['Dune Walk', 66, 68], [null, 63, 71], ['Aquadream Bay', 63, 73]] },
    { id: 'C', name: 'Train régional', color: '#FFD24D', dash: '22 12', pts: [
      [null, 12, 0], ['Northwoods', 12, 6], ['Northgate', 18, 12], ['Hargrove Junction', 18, 24], ['Fernhill', 18, 36], ['Hargrove Sud', 18, 42], [null, 18, 47],
      ['Fox Terrace', 24, 53], ['Gare Centrale', 28, 57], ['Kingsway', 32, 61], [null, 36, 65], ['Southgate Jct', 36, 73], [null, 36, 77]] },
    { id: 'F', name: 'Navette lacustre', color: '#3AA8C1', dash: '10 10', pts: [
      ['Hargrove Lakeside', 34, 30], [null, 41, 30], ['Pine Island', 45, 34], [null, 51, 40], ['Oakwood Centre', 54, 40]] }
  ];

  var LABEL = { // [dx, dy, anchor, rotate]
    'Hargrove Heights': 'r', 'Northgate': 'l', 'Northwoods': 'l', 'Peninsula Point': 'r', 'Briar Hill': 'ur', 'Westbury': 'ur', 'Halton': 'l', 'Gare Centrale': 'ur', 'Hôtel de Ville': 'dr', 'Esplanade': 'ur',
    'Union Yards': 'dr', 'Market Sq': 'ur', 'Albion Sq': 'ur', 'Fairview': 'dr', 'Fox Terrace': 'ur', 'Harbor Point': 'ur', 'Southshore': 'dr', 'Kessler': 'ur', 'Oakwood Pl': 'ur', 'Grafton': 'r',
    'Fox Landing': 'l', 'Kingsway': 'ur', 'Civic Center': 'dr', 'Bowman St': 'dr', 'Eastgate': 'dr', 'Hargrove Lakeside': 'r', 'Shore Rd': 'ur', 'Birchwood': 'ur', 'Hargrove Center': 'ul',
    'Calder': 'r', 'Hargrove Sud': 'r', 'Fernhill': 'r', 'Glenwood': 'r', 'Carroll Park': 'ur', 'Marston': 'r', 'Wakefield': 'dr', 'Pell St': 'dr', 'Expo Center': 'ur', 'Aéroport WBY': 'l',
    'Southgate Jct': 'dr', 'Holloway': 'ur', 'Millbrook Sud': 'dr', 'Kingsbury': 'dr', 'Riverside Park': 'dr', 'Westfield Beach': 'r', 'Lakefront': 'r', 'Aquadream Bay': 'r', 'Oakwood Centre': 'r',
    'Pine Island': 'r', 'Fox Park': 'l', 'Weston': 'ur', 'Brookfield': 'ur', 'Linden St': 'ur', 'Halsey': 'ur', 'Spring St': 'ur', 'Pembrook': 'ur', 'Ridgeway': 'ur', 'Collins Ave': 'ur',
    'Greenleaf': 'ur', 'Wyndham': 'ur', 'Corliss': 'ur', 'Ellery': 'dr', 'Westmoor': 'dr', 'Brookhaven': 'dr', 'Pinewood': 'dr', 'Elmhurst': 'dr', 'Dunes Park': 'dr', 'Westfield Sud': 'dr', 'Seaside': 'dr',
    'Seabright': 'ur', 'Hollis': 'r', 'Kendrick': 'r', 'Ashford': 'l', 'Wexford': 'r', 'Dune Walk': 'l', 'Old Town': 'r', 'Wellington Green': 'r', 'St. Andrews': 'r', 'Thornbury': 'l', 'Kilburn': 'l',
    'Beacon Rd': 'l', 'Ashby': 'l', 'Mill Pond': 'r', 'Orchard Hill': 'r', 'Westfield Port': 'r', 'Sandpiper': 'r', 'Harbor Lights': 'r', 'Granville': 'l', 'Millbrook Center': 'l', 'Cedar Falls': 'l', 'Lindenwood': 'l'
  };

  function district(x, y) {
    if (x >= 24 && x <= 40 && y >= 48 && y <= 66) return 'Downtown';
    if (x >= 68 && y < 37) return 'Péninsule';
    if (x < 36 && y < 48) return 'Hargrove';
    if (x >= 44 && x < 68 && y < 52) return 'Oakwood';
    if (x >= 52 || (x >= 46 && y > 56)) return 'Westfield';
    return 'Millbrook';
  }

  var stations = {}, order = [];
  LINES.forEach(function (l) {
    l.stations = [];
    l.pts.forEach(function (p) {
      if (!p[0]) return;
      var s = stations[p[0]];
      if (!s) { s = stations[p[0]] = { name: p[0], x: p[1], y: p[2], lines: [], district: district(p[1], p[2]), label: LABEL[p[0]] || null }; order.push(s); }
      var lid = l.branch || l.id;
      if (s.lines.indexOf(lid) < 0) s.lines.push(lid);
      l.stations.push(p[0]);
    });
  });
  LINES.forEach(function (l) { if (l.stations.length) { stations[l.stations[0]].terminus = true; stations[l.stations[l.stations.length - 1]].terminus = true; } });
  // default label placement from local direction
  LINES.forEach(function (l) {
    l.pts.forEach(function (p, i) {
      if (!p[0] || stations[p[0]].label) return;
      var a = l.pts[Math.max(0, i - 1)], b = l.pts[Math.min(l.pts.length - 1, i + 1)];
      var dx = b[1] - a[1], dy = b[2] - a[2];
      stations[p[0]].label = dy === 0 ? 'ur' : (dx === 0 ? 'r' : 'r');
    });
  });

  // edges for routing (between consecutive named stations along a line, with geometry)
  var edges = [];
  LINES.forEach(function (l) {
    var lid = l.branch || l.id, prev = null, geo = [];
    l.pts.forEach(function (p) {
      geo.push([p[1], p[2]]);
      if (p[0]) {
        if (prev) edges.push({ a: prev, b: p[0], line: lid, geo: geo.slice() });
        prev = p[0]; geo = [[p[1], p[2]]];
      }
    });
  });

  // ---- terrain (smooth vector)
  var BAY = [[35, 54.5], [34, 52], [33.5, 47], [33.5, 41], [34.2, 36], [36.5, 30], [38.8, 25], [41, 20], [43.9, 14.6], [48, 10], [53.6, 7.3], [60, 4], [66, 1.5], [70, -4], [72, -16], [84, -16], [83, -6], [80, 4], [76, 10.4], [70, 14], [62.8, 18.8], [58, 24], [54.5, 30], [52.3, 35], [50.8, 39.6], [46, 42.5], [42.3, 44.5], [39.5, 48], [37.8, 51.6], [36.3, 53.6]];
  var LAKE = [[93, -16], [92, -6], [91.5, -1], [91, 6], [91, 13.5], [88, 23], [83, 29], [78.6, 37.5], [74.5, 47], [71.5, 57], [70, 66.7], [67.8, 78], [66, 92], [140, 92], [140, -16]];
  var RIVER = [[34.5, 54], [32.5, 56], [30.5, 58.5], [28, 62], [26, 65], [24, 67.7], [22.5, 71], [21, 78], [18, 84], [16, 92]];
  var CREEK = [[73, 43], [69.5, 45], [66, 46.5], [62, 49], [58.5, 50.5]];
  var PONDS = [[9, 26, 1.6], [26, 10, 1.3], [44, 63, 1.4], [10, 69, 1.1], [60, 66, 1.2], [6, 49, 1]];
  var ISLAND = [[45, 33.5, 1.8], [62, 10, 1.4]];
  var PARKS = [[14, 20, 4.5], [22, 5, 3.5], [6, 30, 3], [30, 20, 2.6], [10, 40, 2], [34, 44, 1.6], [20, 60, 2], [12, 66, 2.6], [41, 68, 3.5], [50, 72, 5.5], [56, 42, 3.2], [58, 28, 2.4], [53, 62, 2.6],
    [82, 22, 3.4], [86, 9, 3], [76, 31, 2.2], [73, 52, 1.6], [70.5, 61, 1.4], [64, 55, 1.8], [45, 33.5, 1.8], [36, 66, 1.6], [26, 41, 1.4], [62, 10, 1.4], [4, 58, 1.8], [30, 70, 1.2], [-8, 18, 4], [-14, 46, 5], [-26, 30, 3.5], [-6, 76, 4], [-22, 66, 3], [6, -6, 3.5], [32, -8, 3], [48, 84, 4], [30, 86, 3], [-30, 8, 3], [-34, 54, 3.5], [56, 2, 2]];
  var PONDS2 = [[-18, 34, 2.2], [-4, 60, 1.5], [-28, 78, 2], [40, 86, 1.4], [18, -4, 1.6]];
  function hash(x, y) { var n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453; return n - Math.floor(n); }
  var S = 20;
  function f(n) { return (n * S).toFixed(1); }
  function closedSmooth(pts) {
    var n = pts.length, d = 'M' + f(pts[0][0]) + ' ' + f(pts[0][1]);
    for (var i = 0; i < n; i++) {
      var p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
      d += 'C' + f(p1[0] + (p2[0] - p0[0]) / 6) + ' ' + f(p1[1] + (p2[1] - p0[1]) / 6) + ' ' + f(p2[0] - (p3[0] - p1[0]) / 6) + ' ' + f(p2[1] - (p3[1] - p1[1]) / 6) + ' ' + f(p2[0]) + ' ' + f(p2[1]);
    }
    return d + 'Z';
  }
  function openSmooth(pts) {
    var n = pts.length, d = 'M' + f(pts[0][0]) + ' ' + f(pts[0][1]);
    for (var i = 0; i < n - 1; i++) {
      var p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(n - 1, i + 2)];
      d += 'C' + f(p1[0] + (p2[0] - p0[0]) / 6) + ' ' + f(p1[1] + (p2[1] - p0[1]) / 6) + ' ' + f(p2[0] - (p3[0] - p1[0]) / 6) + ' ' + f(p2[1] - (p3[1] - p1[1]) / 6) + ' ' + f(p2[0]) + ' ' + f(p2[1]);
    }
    return d;
  }
  function blob(c, k) {
    var pts = [], N = 9;
    for (var i = 0; i < N; i++) {
      var ang = i / N * Math.PI * 2 + hash(c[0], c[1]) * 2, rr = c[2] * (0.72 + hash(c[0] * 3 + i, c[1] * 5 + k) * 0.5);
      pts.push([c[0] + Math.cos(ang) * rr * 1.08, c[1] + Math.sin(ang) * rr * 0.92]);
    }
    return closedSmooth(pts);
  }
  var waterD = closedSmooth(BAY) + closedSmooth(LAKE) + PONDS.concat(PONDS2).map(function (p) { return blob(p, 1); }).join('');
  var parksD = PARKS.map(function (p) { return blob(p, 2); }).join('');
  var islandD = ISLAND.map(function (p) { return blob(p, 3); }).join('');
  var terrain = { water: waterD, parks: parksD, islands: islandD, river: openSmooth(RIVER), creek: openSmooth(CREEK) };

  window.WB_METRO = { W: W, H: H, lines: LINES, stations: stations, order: order, edges: edges, terrain: terrain };
  window.dispatchEvent(new Event('wb-metro-ready'));
})();

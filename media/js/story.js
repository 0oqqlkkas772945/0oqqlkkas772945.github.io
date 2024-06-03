undum.game.id = 'A7798F78-C870-11E2-90CC-606C662AE7E4'; // IFID
undum.game.version = '2.0';

function deep_copy(object) {
    return $.extend({}, object);
}

Array.prototype.peek = function () {
    return this[this.length - 1];
}

$.fn.quiet_focus = function() {
    var reference = $(document);
    var x = reference.scrollLeft();
    var y = reference.scrollTop();
    this.focus();
    window.scrollTo(x, y);
};

// Copied from undum.js
/* Fades in and out a highlight on the given element. */
function showHighlight(domElement) {
    var highlight = domElement.find(".highlight");
    if (highlight.size() <= 0) {
        highlight = $('<div>').addClass('highlight');
        domElement.append(highlight);
    }
    highlight.fadeIn(250);
    setTimeout(function() {
        highlight.fadeOut(1000);
    }, 2000);
};

var BillionQuality = function(title, options) {
    undum.IntegerQuality.call(this, title, options);
};
BillionQuality.inherits(undum.IntegerQuality);
BillionQuality.prototype.format = function(character, value) {
    return undum.IntegerQuality.prototype.format.call(this, character, value < 0 ? 0 : value) + ' Billion';
};

var xQuality = function(title, options) {
    undum.IntegerQuality.call(this, title, options);
};
xQuality.inherits(undum.IntegerQuality);
xQuality.prototype.format = function(character, value) {
    if (value > 0) {
	return '(×' + undum.IntegerQuality.prototype.format.call(this, character, value) + ')';
    }
    return null;
};

undum.game.qualityGroups = {
    planet: new undum.QualityGroup('Planet', {priority: '0000'}),
    moon: new undum.QualityGroup('Moon', {priority: '0001'}),
    away: new undum.QualityGroup('Lifeboat', {priority: '0002'}),
    technology: new undum.QualityGroup('Technology', {priority: '0003'}),
    society: new undum.QualityGroup('Society', {priority: '0004'}),
};
undum.game.qualities = {
    // planet
    planet_state: new undum.OnOffQuality('In Cryostasis', {group: 'planet', priority: '0000', onDisplay: '&#10003;'}),
    planet_population : new BillionQuality('Population', {group: 'planet', priority: '0001'}),
    planet_economy: new undum.WordScaleQuality('Economy', ['Destroyed', 'Depressed', 'Stratified', 'Stable'], {group: 'planet', priority: '0002', offset: -3, useBonuses: false}),
    planet_environment: new undum.WordScaleQuality('Environment', ['Destroyed', 'Collapsed', 'Collapsing', 'Stable'], {group: 'planet', priority: '0003', offset: -3, useBonuses: false}),
    planet_agriculture: new undum.WordScaleQuality('Agriculture', ['Derisory', 'Problematic', 'Insufficient', 'Sufficient', 'Excessive'], {group: 'planet', priority: '0004', offset: -3, useBonuses: false}),
    planet_water: new undum.WordScaleQuality('Water', ['Derisory', 'Problematic', 'Insufficient', 'Sufficient', 'Excessive'], {group: 'planet', priority: '0005', offset: -3, useBonuses: false}),
    planet_energy: new undum.WordScaleQuality('Energy', ['Derisory', 'Problematic', 'Insufficient', 'Sufficient', 'Excessive'], {group: 'planet', priority: '0006', offset: -3, useBonuses: false}),
    // moon
    moon_state: new undum.OnOffQuality('In Cryostasis', {group: 'moon', priority: '0000', onDisplay: '&#10003;'}),
    moon_population : new BillionQuality('Population', {group: 'moon', priority: '0001'}),
    moon_economy: new undum.WordScaleQuality('Economy', ['Destroyed', 'Depressed', 'Stratified', 'Stable'], {group: 'moon', priority: '0002', offset: -3, useBonuses: false}),
    moon_environment: new undum.WordScaleQuality('Environment', ['Destroyed', 'Collapsed', 'Collapsing', 'Stable'], {group: 'moon', priority: '0003', offset: -3, useBonuses: false}),
    moon_agriculture: new undum.WordScaleQuality('Agriculture', ['Derisory', 'Problematic', 'Insufficient', 'Sufficient', 'Excessive'], {group: 'moon', priority: '0004', offset: -3, useBonuses: false}),
    moon_water: new undum.WordScaleQuality('Water', ['Derisory', 'Problematic', 'Insufficient', 'Sufficient', 'Excessive'], {group: 'moon', priority: '0005', offset: -3, useBonuses: false}),
    moon_energy: new undum.WordScaleQuality('Energy', ['Derisory', 'Problematic', 'Insufficient', 'Sufficient', 'Excessive'], {group: 'moon', priority: '0006', offset: -3, useBonuses: false}),
    // lifeboat
    away_population : new BillionQuality('Population', {group: 'away', priority: '0001'}),
    away_economy: new undum.WordScaleQuality('Economy', ['Destroyed', 'Depressed', 'Stratified', 'Stable'], {group: 'away', priority: '0002', offset: -3, useBonuses: false}),
    away_environment: new undum.WordScaleQuality('Environment', ['Destroyed', 'Collapsed', 'Collapsing', 'Stable'], {group: 'away', priority: '0003', offset: -3, useBonuses: false}),
    away_agriculture: new undum.WordScaleQuality('Agriculture', ['Derisory', 'Problematic', 'Insufficient', 'Sufficient', 'Excessive'], {group: 'away', priority: '0004', offset: -3, useBonuses: false}),
    away_water: new undum.WordScaleQuality('Water', ['Derisory', 'Problematic', 'Insufficient', 'Sufficient', 'Excessive'], {group: 'away', priority: '0005', offset: -3, useBonuses: false}),
    away_energy: new undum.WordScaleQuality('Energy', ['Derisory', 'Problematic', 'Insufficient', 'Sufficient', 'Excessive'], {group: 'away', priority: '0006', offset: -3, useBonuses: false}),
    // technology
    cryostasis: new undum.OnOffQuality('Cryostasis', {group: 'technology', priority: '0000', onDisplay: '<a href="./planetSleep">Use on planet</a><br><a href="./moonSleep">Use on moon</a>'}),
    biofuel: new undum.OnOffQuality('Biofuels', {group: 'technology', priority: '0001'}),
    nanorobotics: new undum.OnOffQuality('Nanorobotics', {group: 'technology', priority: '0002'}),
    desalination: new undum.OnOffQuality('Mass desalination', {group: 'technology', priority: '0003'}),
    geoengineering: new undum.OnOffQuality('Geoengineering', {group: 'technology', priority: '0004'}),
    interstellar: new undum.OnOffQuality('Interstellar Travel', {group: 'technology', priority: '0005'}),
    // society
    robots: new xQuality('Surplus Robotics', {group: 'society', priority: '0000'}),
    consumerism: new undum.OnOffQuality('Consumerism', {group: 'society', priority: '0001'}),
    polarization: new undum.OnOffQuality('Polarization', {group: 'society', priority: '0003'}),
};

function force_zero_both(character, system, quality) {
    system.setQuality('planet_' + quality, 0);
    system.setQuality('moon_' + quality, 0);
}

function decrement_both(character, system, quality) {
    if (character.qualities.planet_state == 0) {
	system.setQuality('planet_' + quality, character.qualities['planet_' + quality] - 1);
    }
    if (character.qualities.moon_state == 0) {
	system.setQuality('moon_' + quality, character.qualities['moon_' + quality] - 1);
    }
}

function decrement_both_regardless(character, system, quality) {
    system.setQuality('planet_' + quality, character.qualities['planet_' + quality] - 1);
    system.setQuality('moon_' + quality, character.qualities['moon_' + quality] - 1);
}

function increment_both(character, system, quality) {
    if (character.qualities.planet_state == 0) {
	system.setQuality('planet_' + quality, character.qualities['planet_' + quality] + 1);
    }
    if (character.qualities.moon_state == 0) {
	system.setQuality('moon_' + quality, character.qualities['moon_' + quality] + 1);
    }
}

function lifeboat_both(character, system, quality) {
    var is_population = (quality == 'population');
    var value = Math.ceil((character.qualities['planet_' + quality] + character.qualities['moon_' + quality]) / (is_population ? 1 : 2));
    system.setQuality('planet_' + quality, is_population ? 0 : null);
    system.setQuality('moon_' + quality, is_population ? 0 : null);
    system.setQuality('away_' + quality, value);
}

function lifeboat_all(character, system) {
    lifeboat_both(character, system, 'population');
    lifeboat_both(character, system, 'economy');
    lifeboat_both(character, system, 'environment');
    lifeboat_both(character, system, 'agriculture');
    lifeboat_both(character, system, 'water');
    lifeboat_both(character, system, 'energy');
}

function decrement_towards_zero(character, system, quality) {
    var old_value = character.qualities[quality];
    if (old_value >= 1) {
	system.setQuality(quality, old_value - 1);
	return true;
    }
    return false;
}

function decay_inventory(character, system) {
    decrement_towards_zero(character, system, 'consumerism');
    if (character.qualities.consumerism == 2) {
	accumulate('Consumerism on downswing.');
    }
    decrement_towards_zero(character, system, 'polarization');
    if (character.qualities.polarization == 2) {
	accumulate('Increase in cross-cultural dialogue.');
    }
    if (waking || (character.qualities.planet_state == 0 && character.qualities.moon_state == 0)) {
	character.sandbox.gap = 0;
    } else {
	++character.sandbox.gap;
    }
}

var CAMERA_HEIGHT = 1.9;
var CLIPPING_EPSILON = 0.0001;

var CAMERA_SCALE = Math.sqrt(1 + CAMERA_HEIGHT * CAMERA_HEIGHT);

function get_coordinate_system(look, halfWidth, halfHeight) {
    var result = {x: {}, y: {}, z: {}, camera: {}, halfWidth: halfWidth, halfHeight: halfHeight};
    var offset = -Math.sqrt(look.x * look.x + look.y * look.y);
    result.z.dx = look.x / offset;
    result.z.dy = look.y / offset;
    result.z.dz = -CAMERA_HEIGHT;
    result.camera.x = look.x - result.z.dx;
    result.camera.y = look.y - result.z.dy;
    result.x.dx = result.z.dy;
    result.x.dy = -result.z.dx;
    var result_z_magnitude = Math.sqrt(result.z.dx * result.z.dx + result.z.dy * result.z.dy + result.z.dz * result.z.dz);
    var result_x_magnitude = Math.sqrt(result.x.dx * result.x.dx + result.x.dy * result.x.dy);
    result.z.dx /= result_z_magnitude;
    result.z.dy /= result_z_magnitude;
    result.z.dz /= result_z_magnitude;
    result.x.dx /= result_x_magnitude;
    result.x.dy /= result_x_magnitude;
    result.y.dx = result.z.dz * result.x.dy;
    result.y.dy = -result.z.dz * result.x.dx;
    result.y.dz = result.z.dy * result.x.dx - result.z.dx * result.x.dy;
    return result;
}

function place_in_coordinate_system(object, coordinate_system) {
    var result = {};
    var dx = object.x - coordinate_system.camera.x;
    var dy = object.y - coordinate_system.camera.y;
    var dz = -CAMERA_HEIGHT;
    var z = dx * coordinate_system.z.dx + dy * coordinate_system.z.dy + dz * coordinate_system.z.dz;
    result.visible = (z > 0);
    if (result.visible) {
	result.scale = 1 / z;
	result.x = result.scale * coordinate_system.halfWidth * (dx * coordinate_system.x.dx + dy * coordinate_system.x.dy);
	result.y = -result.scale * coordinate_system.halfHeight * (dx * coordinate_system.y.dx + dy * coordinate_system.y.dy + dz * coordinate_system.y.dz);
	result.scale *= CAMERA_SCALE;
    }
    return result;
}

function place_and_clip_in_coordinate_system(from, to, coordinate_system) {
    var result = {from: {}, to: {}};
    var from_dx = from.x - coordinate_system.camera.x;
    var from_dy = from.y - coordinate_system.camera.y;
    var to_dx = to.x - coordinate_system.camera.x;
    var to_dy = to.y - coordinate_system.camera.y;
    var dz = -CAMERA_HEIGHT;
    var from_z = from_dx * coordinate_system.z.dx + from_dy * coordinate_system.z.dy + dz * coordinate_system.z.dz;
    var to_z = to_dx * coordinate_system.z.dx + to_dy * coordinate_system.z.dy + dz * coordinate_system.z.dz;
    result.visible = (from_z > 0) || (to_z > 0);
    if (result.visible) {
	if (from_z <= 0) {
	    var proportion = (from_z - CLIPPING_EPSILON) / (to_z - from_z);
	    from_dx += proportion * (from_dx - to_dx);
	    from_dy += proportion * (from_dy - to_dy);
	    from_z = CLIPPING_EPSILON;
	} else if (to_z <= 0) {
	    var proportion = (to_z - CLIPPING_EPSILON) / (from_z - to_z);
	    to_dx += proportion * (to_dx - from_dx);
	    to_dy += proportion * (to_dy - from_dy);
	    to_z = CLIPPING_EPSILON;
	}
	from_scale = 1 / from_z;
	result.from.x = from_scale * coordinate_system.halfWidth * (from_dx * coordinate_system.x.dx + from_dy * coordinate_system.x.dy);
	result.from.y = -from_scale * coordinate_system.halfHeight * (from_dx * coordinate_system.y.dx + from_dy * coordinate_system.y.dy + dz * coordinate_system.y.dz);
	to_scale = 1 / to_z;
	result.to.x = to_scale * coordinate_system.halfWidth * (to_dx * coordinate_system.x.dx + to_dy * coordinate_system.x.dy);
	result.to.y = -to_scale * coordinate_system.halfHeight * (to_dx * coordinate_system.y.dx + to_dy * coordinate_system.y.dy + dz * coordinate_system.y.dz);
    }
    return result;
}

var ARROW_HEAD_POSITION = 0.6;
var HALF_ARROW_HEAD_LENGTH = 0.03;
var HALF_ARROW_HEAD_WIDTH = 0.05;

function place_and_clip_arrow_head_in_coordinate_system(from, to, coordinate_system, side) {
    var dx = to.x - from.x;
    var dy = to.y - from.y;
    var length = Math.sqrt(dx * dx + dy * dy);
    var udx = dx / length;
    var udy = dy / length;
    return place_and_clip_in_coordinate_system(
	{
	    x: from.x + ARROW_HEAD_POSITION * dx - HALF_ARROW_HEAD_LENGTH * udx - side * HALF_ARROW_HEAD_WIDTH * udy,
	    y: from.y + ARROW_HEAD_POSITION * dy - HALF_ARROW_HEAD_LENGTH * udy + side * HALF_ARROW_HEAD_WIDTH * udx,
	},
	{
	    x: from.x + ARROW_HEAD_POSITION * dx + HALF_ARROW_HEAD_LENGTH * udx,
	    y: from.y + ARROW_HEAD_POSITION * dy + HALF_ARROW_HEAD_LENGTH * udy,
	},
	coordinate_system
    );
}

var rendering_enabled = false;
var rendering_fade_in = true;

var source_situation_name;
var destination_situation_name;

var old_moon_marker_name = null;
var moon_marker_name = null;
var new_moon_marker_name = null;

document.getElementById('overlay').style.progress = 0;
var moon = document.getElementById('moon');
var flare = document.getElementById('flare');

function render(progress) {
    var width = window.innerWidth;
    var height = window.innerHeight;
    var halfWidth = width / 2;
    var halfHeight = height / 2;
    var context = document.getElementById('overlay').getContext('2d');
    context.canvas.width = width;
    context.canvas.height = height;
    if (typeof(progress) != 'number') {
	progress = context.canvas.style.progress;
    }
    context.clearRect(0, 0, width, height);
    if (!rendering_enabled) {
	return;
    }
    context.save();
    context.translate(halfWidth, halfHeight);
    context.globalAlpha = 0.3 * (rendering_fade_in ? progress : 1);
    context.strokeStyle = '#b0a8a0';
    context.lineWidth = 4;
    context.lineCap = 'round';
    context.lineJoin = 'round';
    var source_situation = undum.game.situations[source_situation_name];
    var destination_situation = undum.game.situations[destination_situation_name];
    var camera_x = source_situation.x + progress * (destination_situation.x - source_situation.x);
    var camera_y = source_situation.y + progress * (destination_situation.y - source_situation.y);
    if (Math.abs(source_situation.x + destination_situation.x) < 0.01 && Math.abs(source_situation.y + destination_situation.y) < 0.01) {
	var bend = 0.4 * progress * (1 - progress);
	camera_x += bend * source_situation.y;
	camera_y += bend * destination_situation.x;
    }
    var coordinate_system = get_coordinate_system({x: camera_x, y: camera_y}, halfWidth, halfHeight);
    context.beginPath();
    for (var i in undum.game.situations) {
	var from = undum.game.situations[i];
	if (from.visible) {
	    var visible_links = from.visible_links;
	    for (var j in visible_links) {
		if (visible_links[j]) {
		    var to = undum.game.situations[j];
		    var projected = place_and_clip_in_coordinate_system(from, to, coordinate_system);
		    if (projected.visible) {
			context.moveTo(projected.from.x, projected.from.y);
			context.lineTo(projected.to.x, projected.to.y);
		    }
		    projected = place_and_clip_arrow_head_in_coordinate_system(from, to, coordinate_system, -1);
		    if (projected.visible) {
			context.moveTo(projected.from.x, projected.from.y);
			context.lineTo(projected.to.x, projected.to.y);
		    }
		    projected = place_and_clip_arrow_head_in_coordinate_system(from, to, coordinate_system, 1);
		    if (projected.visible) {
			context.moveTo(projected.from.x, projected.from.y);
			context.lineTo(projected.to.x, projected.to.y);
		    }
		}
	    }
	}
    }
    context.stroke();
    for (var i in undum.game.situations) {
	var situation = undum.game.situations[i];
	if (situation.visible) {
	    var projected = place_in_coordinate_system(situation, coordinate_system);
	    if (projected.visible) {
		if (halfWidth < 400) {
		    projected.scale *= halfWidth / 400;
		}
		var projected_width = situation.icon.width * projected.scale;
		var projected_height = situation.icon.height * projected.scale;
		context.drawImage(situation.icon, projected.x - projected_width / 2, projected.y - projected_height / 2, projected_width, projected_height);
	    }
	}
    }
    var moon_markers = {
	old_: {name: old_moon_marker_name, alpha: 0.25 * (1 - progress)},
	current_: {name: moon_marker_name, alpha: 0.25},
	new_: {name: new_moon_marker_name, alpha: 0.25 * progress},
    };
    for (var i in moon_markers) {
	var moon_marker = undum.game.situations[moon_markers[i].name];
	if (moon_marker && moon_marker.visible) {
	    context.globalAlpha = moon_markers[i].alpha;
	    var projected = place_in_coordinate_system(moon_marker, coordinate_system);
	    if (projected.visible) {
		if (halfWidth < 400) {
		    projected.scale *= halfWidth / 400;
		}
		var projected_width = moon.width * projected.scale / 2;
		var projected_height = moon.height * projected.scale / 2;
		context.drawImage(moon, projected.x + projected_width / 5, projected.y - 2 * projected_height / 3, projected_width, projected_height);
	    }
	}	
    }
    context.globalAlpha = 0.6 * (rendering_fade_in ? progress : 1);
    context.rotate(2 * Math.PI * progress);
    context.drawImage(flare, -flare.width / 2, -flare.height / 2);
    context.restore();
}

$(window).resize(render);

function moon_mark(situation_name) {
    old_moon_marker_name = moon_marker_name;
    moon_marker_name = null;
    new_moon_marker_name = situation_name;
}

function moon_unmark() {
    old_moon_marker_name = moon_marker_name;
    moon_marker_name = null;
    new_moon_marker_name = null;
}

function moon_mark_complete() {
    old_moon_marker_name = null;
    if (new_moon_marker_name != null) {
	moon_marker_name = new_moon_marker_name;
    }
    new_moon_marker_name = null;    
}

function every_turn(character, system) {
    decay_inventory(character, system);
    undo_state_save(character, system);
}

function walk(character, system, to) {
    $('#overlay').finish();
    destination_situation_name = to;
    every_turn(character, system);
    if (source_situation_name != destination_situation_name && !waking && !story_over) {
	undum.game.situations[source_situation_name].visible_links[destination_situation_name] = true;
    }
    undum.game.situations[destination_situation_name].visible = true;
    $('#overlay').animate({ progress: 1 }, { duration: 1400, step: render, complete: function() {
	rendering_fade_in = false;
	source_situation_name = destination_situation_name;
	moon_mark_complete();
	document.getElementById('overlay').style.progress = 0;
    }});
}

var was_begun = false;
var was_walk_started = false;
function undum_begin_hook() {
    if (was_walk_started) {
	rendering_enabled = true;
	render();
    }
    was_begun = true;
}
function begin(character, system, to) {
    $('#overlay').finish();
    if (was_walk_started) {
	system.write('<h1>Ceteris Paribus</h1>');
    }
    was_walk_started = true;
    rendering_enabled = was_begun;
    rendering_fade_in = true;
    source_situation_name = to;
    walk(character, system, to);
}

function pause(system, href, caption) {
    if (typeof(caption) == 'undefined') {
	caption = 'click to continue';
    }
    system.write('<p class="transient"><a class="sticky click_message" href="' + href + '">' + caption + '</a></p>');
    $('a.click_message').quiet_focus();
}

var bad_ending_reason = 'story code error';
function bad_end(system, reason) {
    bad_ending_reason = reason;
    cancel_wake_and_sleep_offers(system);
    var destination_situation = undum.game.situations[destination_situation_name];
    var bad_end = undum.game.situations['end'];
    bad_end.x = destination_situation.x * CLIPPING_EPSILON;
    bad_end.y = destination_situation.y * CLIPPING_EPSILON;
    pause(system, 'end');
}

var last_continue_link;
var waking = false;

function wake(character, system) {
    waking = true;
    if (character.sandbox.gap > 5) {
	system.setQuality('polarization', 12);
	accumulate('Long cryostasis produces cultural gap.  Politics polarized.');
    }
}

function just_waking() {
    var result = waking;
    waking = false;
    return result;
}

wake_sleep_actions = {
    planetSleep: function(character, system, action) {
	accumulate('Planet enters cryostasis.');
	system.setQuality('planet_state', 1);
	moon_mark(destination_situation_name);
	system.doLink(last_continue_link);
    },
    moonSleep: function(character, system, action) {
	accumulate('Moon enters cryostasis.');
	system.setQuality('moon_state', 1);
	moon_mark(destination_situation_name);
	system.doLink(last_continue_link);
    },
    planetWake: function(character, system, action) {
	accumulate('Planet wakes from cryostasis.  Society shifts.');
	wake(character, system);
	system.setQuality('planet_state', 0);
	var to = moon_marker_name;
	moon_mark(null);
	system.doLink(to);
    },
    moonWake: function(character, system, action) {
	accumulate('Moon wakes from cryostasis.  Society shifts.');
	wake(character, system);
	system.setQuality('moon_state', 0);
	var to = moon_marker_name;
	moon_mark(null);
	system.doLink(to);
    },
};
wake_sleep_act = function(character, system, action) {
    $('#overlay, .quality, .quality_group, .highlight').finish();
    var response = wake_sleep_actions[action];
    if (typeof(response) == 'function') {
	response(character, system, action);
    } else if (response) {
	system.write(response);
    }
};

function offer_wake_sleep_or_continue(character, system, continue_link) {
    last_continue_link = continue_link;
    if (character.qualities.cryostasis) {
	if (character.qualities.planet_state) {
	    undum.game.qualities['cryostasis'].onDisplay = '<a href="./planetWake">Wake planet</a>';
	} else if (character.qualities.moon_state) {
	    undum.game.qualities['cryostasis'].onDisplay = '<a href="./moonWake">Wake moon</a>';
	} else {
	    undum.game.qualities['cryostasis'].onDisplay = '<a href="./planetSleep">Freeze planet</a><br><a href="./moonSleep">Freeze moon</a>';
	}
	system.setQuality('cryostasis', 1);
    }
    pause(system, continue_link);
}

function cancel_wake_and_sleep_offers(system) {
    $('#q_cryostasis span.value').finish();
    system.clearLinks('./planetWake');
    system.clearLinks('./moonWake');
    system.clearLinks('./planetSleep');
    system.clearLinks('./moonSleep');
}

function maybe_force_option(character, system) {
    function get_problem(prefix) {
	var problem = null;
	if (!character.qualities.away_population) {
	    if (character.qualities[prefix + 'population'] < 1) {
		problem = 'population loss';
	    } else if (character.qualities[prefix + 'state'] == 0) {
		if (character.qualities[prefix + 'economy'] < -3) {
		    problem = 'poverty';
		} else if (character.qualities[prefix + 'environment'] < -3) {
		    problem = 'environmental collapse';
		} else if (character.qualities[prefix + 'agriculture'] < -3) {
		    problem = 'starvation';
		} else if (character.qualities[prefix + 'water'] < -3) {
		    problem = 'water shortage';
		} else if (character.qualities[prefix + 'energy'] < -3) {
		    problem = 'energy crisis';
		}
	    }
	}
	return problem;
    }
    var planet_problem = get_problem('planet_');
    var moon_problem = get_problem('moon_');
    if (planet_problem) {
	if (moon_problem) {
	    if (planet_problem == moon_problem) {
		bad_end(system, planet_problem);
	    } else {
		bad_end(system, 'planet-side ' + planet_problem + ' and moon-side ' + moon_problem);
	    }
	} else {
	    bad_end(system, 'planet-side ' + planet_problem);
	}
	return true;
    } else if (moon_problem) {
	bad_end(system, 'moon-side ' + moon_problem);
	return true;
    }
    return false;
}

var story_over = false;
function good_end(system) {
    cancel_wake_and_sleep_offers(system);
    story_over = true;
    var good_end = undum.game.situations['end'];
    good_end.icon = moon;
    good_end.x = 0;
    good_end.y = 0.1;
    for (var i in undum.game.situations) {
	delete undum.game.situations[i].visible_links['end'];
    }
    pause(system, 'end');
}

var undo_stack = [];
function undo_button_update() {
    $("#undo").attr('disabled', undo_stack.length <= 1);
}
function undo_state_save(character, system) {
    if (!story_over) {
	undo_stack.push({
	    situation_name: destination_situation_name,
	    moon_marker_name: new_moon_marker_name || moon_marker_name,
	    waking: waking,
	    qualities: deep_copy(character.qualities),
	    sandbox: deep_copy(character.sandbox),
	    accumulation: accumulation,
	});
	undo_button_update();
    }
}
function undo_state_restore(character, system) {
    if (undo_stack.length > 1) {
	undo_stack.pop();
	undo_state = undo_stack.peek();
	system.surreptitiouslyUpdateCurrentSituation(undo_state.situation_name);
	source_situation_name = undo_state.situation_name;
	destination_situation_name = undo_state.situation_name;
	moon_marker_name = undo_state.moon_marker_name;
	waking = undo_state.waking;
	for (i in undo_state.qualities) {
	    system.setQuality(i, undo_state.qualities[i]);
	}
	$('.quality, .quality_group, .highlight').finish();
	for (i in undo_state.sandbox) {
	    character.sandbox[i] = undo_state.sandbox[i];
	}
	accumulation = undo_state.accumulation;
	$('#content hr').last().nextAll().andSelf().remove();
	if ($('#content hr').size()) {
	    $('#content hr').last().nextAll().andSelf().remove();
	} else {
	    $('#content').children().remove();
	}
	undo_button_update();
	undum.game.situations[source_situation_name].enter(character, system, 'undo');
	render();
    }
}

undum.game.init = function(character, system) {
    character.qualities.planet_state = 0;
    character.qualities.planet_population = 14;
    character.qualities.planet_economy = 1;
    character.qualities.planet_environment = 0;
    character.qualities.planet_agriculture = 1;
    character.qualities.planet_water = 1;
    character.qualities.planet_energy = 0;
    character.qualities.moon_state = 0;
    character.qualities.moon_population = 8;
    character.qualities.moon_economy = 0;
    character.qualities.moon_environment = 0;
    character.qualities.moon_agriculture = 0;
    character.qualities.moon_water = 0;
    character.qualities.moon_energy = 0;
    character.qualities.cryostasis = 0;
    character.qualities.biofuel = 0;
    character.qualities.nanorobotics = 0;
    character.qualities.desalination = 0;
    character.qualities.geoengineering = 0;
    character.qualities.interstellar = 0;
    character.qualities.robots = 0;
    character.qualities.consumerism = 0;
    character.qualities.polarization = 0;
    character.sandbox.gap = 0;
    render();
    $('#undo').off('click');
    $('#undo').click(function () { undo_state_restore(character, system); });
    undo_button_update();
}

undum.game.start = 'start';

var accumulation = '';
function accumulate(text) {
    if (accumulation == '') {
	accumulation = text;
    } else {
	accumulation += '  ' + text;
    }
}

function common_situation(character, system, from, effect, continue_link) {
    if (just_waking()) {
	system.write('<p>' + accumulation + '</p>');
	accumulation = '';
	offer_wake_sleep_or_continue(character, system, continue_link);
    } else {
	effect();
	system.write('<p>' + accumulation + '</p>');
	accumulation = '';
	if (story_over || maybe_force_option(character, system)) return;
	offer_wake_sleep_or_continue(character, system, continue_link);
    }
}

undum.game.situations = {
    start: new undum.Situation({
	enter: function(character, system, from) {
	    system.write('<p class="transient">If this is your first time reading <em>Ceteris Paribus</em>, you may wish to <a class="sibling" href="instructions.html" target="_blank">view the instructions</a> first.  There is also a link in the information panel, which is usually displayed to the left of the story, in case you ever need to refresh your memory.</p>');
	    pause(system, 'war');
	},
	exit: begin
    }),
    end: new undum.Situation({
	x: 0,
	y: 0,
	icon: document.getElementById('death'),
	enter: function(character, system, from) {
	    moon_mark(null);
	    cancel_wake_and_sleep_offers(system);
	    if (story_over) {
		$('#g_away h2').text('New Home');
		system.write('<p>Lifeboat arrives at habitable planet.  New chapter in history.  Maybe.</p>');
		system.write('<h1>Success!</h1>');
	    } else {
		system.write('<h1>Failure (' + bad_ending_reason + ').</h1>');
		pause(system, './reset', 'Restart to try for a better outcome?');
	    }
	},
	act: function(character, system, action) {
	    accumulation = '';
	    system.setQuality('planet_state', 0);
	    system.setQuality('planet_population', 14);
	    system.setQuality('planet_economy', 1);
	    system.setQuality('planet_environment', 0);
	    system.setQuality('planet_agriculture', 1);
	    system.setQuality('planet_water', 1);
	    system.setQuality('planet_energy', 0);
	    system.setQuality('moon_state', 0);
	    system.setQuality('moon_population', 8);
	    system.setQuality('moon_economy', 0);
	    system.setQuality('moon_environment', 0);
	    system.setQuality('moon_agriculture', 0);
	    system.setQuality('moon_water', 0);
	    system.setQuality('moon_energy', 0);
	    system.setQuality('cryostasis', 0);
	    system.setQuality('biofuel', 0);
	    system.setQuality('nanorobotics', 0);
	    system.setQuality('desalination', 0);
	    system.setQuality('geoengineering', 0);
	    system.setQuality('interstellar', 0);
	    system.setQuality('robots', 0);
	    system.setQuality('consumerism', 0);
	    system.setQuality('polarization', 0);
	    character.sandbox.gap = 0;
	    system.doLink('war');
	},
	exit: begin
    }),
    war: new undum.Situation({
	x: 0.5,
	y: 0.5 * Math.sqrt(3),
	icon: document.getElementById('fire'),
	enter: function(character, system, from) {
	    common_situation(character, system, from, function() {
		system.setQuality('robots', 2);
		if (character.qualities.nanorobotics > 0) {
		    accumulate('War.  Nanorobotics devastate population.');
		    force_zero_both(character, system, 'population');
		} else {
		    accumulate('War.  Heavy casualties.  Agriculture stalls.  Environment damaged.  Economy benefits.  Treaty signed.  Peace.  Wartime robotics lie unused.');
		    decrement_both(character, system, 'population');
		    decrement_both(character, system, 'population');
		}
		increment_both(character, system, 'economy');
		decrement_both(character, system, 'environment');
		decrement_both(character, system, 'agriculture');
	    }, 'boom');
	},
	act: wake_sleep_act,
	exit: walk,
    }),
    boom: new undum.Situation({
	x: -0.5,
	y: 0.5 * Math.sqrt(3),
	icon: document.getElementById('life'),
	enter: function(character, system, from) {
	    common_situation(character, system, from, function() {
		if (character.qualities.geoengineering) {
		    accumulate('Population booms.  Consumerism takes hold.  Economy burdened.  Resources stretched.  Population interested in expanding habitable regions.  Geoengineering put to use.');
		} else {
		    accumulate('Population booms.  Consumerism takes hold.  Economy burdened.  Resources stretched.  Population interested in expanding habitable regions, lack suitable geoengineering technology.');
		}
		system.setQuality('consumerism', 5);
		increment_both(character, system, 'population');
		decrement_both(character, system, 'economy');
		decrement_both(character, system, 'agriculture');
		decrement_both(character, system, 'water');
		decrement_both(character, system, 'energy');
	    }, character.qualities.geoengineering ? 'ice' : 'disease');
	},
	act: wake_sleep_act,
	exit: walk,
    }),
    disease: new undum.Situation({
	x: -1,
	y: 0,
	icon: document.getElementById('air'),
	enter: function(character, system, from) {
	    common_situation(character, system, from, function() {
		accumulate('Outbreak and pandemic.  Economy stalls.  Population loss.  More resources per capita.');
		if (character.qualities.nanorobotics) {
		    accumulate('Health care providers plan to reprogram human immune systems with nanorobotics.');
		} else {
		    accumulate('Population interested in reprogramming human immune systems, lack suitable nanorobotics technology.');
		}
		decrement_both(character, system, 'population');
		decrement_both(character, system, 'economy');
		increment_both(character, system, 'agriculture');
		increment_both(character, system, 'water');
		increment_both(character, system, 'energy');
	    }, character.qualities.nanorobotics ? 'cyborgological' : 'agriculture');
	},
	act: wake_sleep_act,
	exit: walk,
    }),
    agriculture: new undum.Situation({
	x: -0.5,
	y: -0.5 * Math.sqrt(3),
	icon: document.getElementById('earth'),
	enter: function(character, system, from) {
	    common_situation(character, system, from, function() {
		decrement_both(character, system, 'environment');
		increment_both(character, system, 'agriculture');
		if (decrement_towards_zero(character, system, 'robots')) {
		    accumulate('Surplus robotics used for agriculture.  Environmental damage.  Water consumption spikes.');
		    increment_both(character, system, 'agriculture');
		} else {
		    accumulate('Focus on agriculture.  Environmental damage.  Water consumption spikes.  Food production could have been greater with more robotics.');
		}
		if (character.qualities.biofuel == 0) {
		    accumulate('Population interested in renewable energy, lacks suitable biofuels.');
		} else {
		    accumulate('Population interested in renewable energy.');
		}
		decrement_both(character, system, 'water');
		decrement_both(character, system, 'water');
	    }, character.qualities.biofuel ? 'bioenergy' : 'industrialization');
	},
	act: wake_sleep_act,
	exit: walk,
    }),
    industrialization: new undum.Situation({
	x: 0.5,
	y: -0.5 * Math.sqrt(3),
	icon: document.getElementById('machine'),
	enter: function(character, system, from) {
	    common_situation(character, system, from, function() {
		if (character.qualities.cryostasis == 0) {
		    accumulate('Scientists develop mass cryostasis.  New understanding of microbiology may lead to better biofuels.');
		    system.setQuality('cryostasis', 1);
		} else if (character.qualities.biofuel == 0) {
		    accumulate('Scientists develop advanced biofuels.  New understanding of microchemistry may lead to nanorobotics.');
		    system.setQuality('biofuel', 1);
		} else if (character.qualities.nanorobotics == 0) {
		    accumulate('Scientists develop nanorobotics.  New understanding of chemical-processing codes may lead to mass desalination.');
		    system.setQuality('nanorobotics', 1);
		} else if (character.qualities.desalination == 0) {
		    if (character.qualities.polarization == 0) {
			accumulate('Politics increase science funding.  Scientists develop mass desalination.  New understanding of environmental transformatives may lead to terraforming and geoengineering.');
		    } else {
			accumulate('Scientists develop mass desalination despite political roadbumps.  New understanding of environmental transformatives may lead to geoengineering.');
		    }
		    system.setQuality('desalination', 1);
		} else if (character.qualities.geoengineering == 0) {
		    if (character.qualities.polarization == 0) {
			accumulate('Politics increase science funding.  Scientists develop geoengineering.  New understanding of biospheres and energy distribution may lead to interstellar travel.');
		    } else {
			accumulate('Scientists, despite political tumult, develop geoengineering.  New understanding of biospheres and energy distribution may lead to interstellar travel.');
		    }
		    system.setQuality('geoengineering', 1);
		} else if (character.qualities.interstellar == 0) {
		    if (character.qualities.polarization == 0) {
			accumulate('Politics increase science funding.  Scientists develop interstellar-capable generation ship.');
			system.setQuality('interstellar', 1);
			if (character.qualities.planet_state) {
			    accumulate('Launch of generation ship delayed while planet in cryostasis.');
			}
			if (character.qualities.moon_state) {
			    accumulate('Launch of generation ship delayed while moon in cryostasis.');
			}
		    } else {
			accumulate('Scientists unable to develop generation ship; blame unstable funding, overly polarized politics.');
			return;
		    }
		}
		increment_both(character, system, 'economy');
		if (decrement_towards_zero(character, system, 'robots')) {
		    accumulate('Surplus robotics aid scientific advances, bolster economy at cost of agriculture and environment.');
		    increment_both(character, system, 'economy');
		} else {
		    accumulate('Scientific advances bolster economy at cost of agriculture and environment.  Economic benefit could have been greater with more robotics.');
		}
		decrement_both(character, system, 'environment');
		decrement_both(character, system, 'agriculture');
		decrement_both(character, system, 'energy');
		decrement_both(character, system, 'energy');
	    }, ((character.qualities.geoengineering > 0) /* (meaning interstellar will be given) */ && (character.qualities.planet_state == 0) && (character.qualities.moon_state == 0)) ? 'stars' : 'environmentalism');
	},
	act: wake_sleep_act,
	exit: walk,
    }),
    environmentalism: new undum.Situation({
	x: 1,
	y: 0,
	icon: document.getElementById('nature'),
	enter: function(character, system, from) {
	    common_situation(character, system, from, function() {
		decrement_both(character, system, 'economy');
		increment_both(character, system, 'environment');
		if (decrement_towards_zero(character, system, 'robots')) {
		    accumulate('Surplus robotics used to improve environment.  Green policies slow economy.');
		    increment_both(character, system, 'environment');
		    increment_both(character, system, 'environment');
		} else {
		    accumulate('Focus on environment.  Green policies slow economy.  Environmental benefit could have been greater with more robotics.');
		}
		if (character.qualities.interstellar) {
		    good_end(system);
		    return;
		}
		if (character.qualities.consumerism) {
		    accumulate('Consumerist attitude drives conflict over resources, undermines water stewardship initiatives.');
		} else {
		    accumulate('Low consumerism allows similar focus on water supplies.');
		}
	    }, character.qualities.consumerism ? 'war' : 'water');
	},
	act: wake_sleep_act,
	exit: walk,
    }),
    ice: new undum.Situation({
	x: -Math.sqrt(3),
	y: 1,
	icon: document.getElementById('ice'),
	enter: function(character, system, from) {
	    common_situation(character, system, from, function() {
		accumulate('Geoengineering initiatives boost economy.  Uncoordinated plans start chain reaction.  Worlds enter double-snowball ice age.  Planet hit hardest.  Civilization suffers.');
		decrement_both_regardless(character, system, 'population');
		decrement_towards_zero(character, system, 'planet_population');
		decrement_towards_zero(character, system, 'planet_population');
		increment_both(character, system, 'economy');
		decrement_both_regardless(character, system, 'environment');
		decrement_both_regardless(character, system, 'agriculture');
		system.setQuality('planet_agriculture', character.qualities.planet_agriculture - 2);
		system.setQuality('planet_agriculture', -3);
		system.setQuality('moon_agriculture', -3);
		system.setQuality('planet_water', -2);
		system.setQuality('moon_water', -2);
		system.setQuality('planet_energy', -3);
		system.setQuality('moon_energy', -3);
	    }, 'disease');
	},
	act: wake_sleep_act,
	exit: walk,
    }),
    cyborgological: new undum.Situation({
	x: -Math.sqrt(3),
	y: -1,
	icon: document.getElementById('spirit'),
	enter: function(character, system, from) {
	    common_situation(character, system, from, function() {
		accumulate('New cyborg technology hits market.  Immune system reprogramming a success.  Agriculture and environment see benefits.  Automation drives unemployment.');
		decrement_both(character, system, 'economy');
		increment_both(character, system, 'environment');
		increment_both(character, system, 'agriculture');
	    }, 'agriculture');
	},
	act: wake_sleep_act,
	exit: walk,
    }),
    bioenergy: new undum.Situation({
	x: 0,
	y: -2,
	icon: document.getElementById('lightning'),
	enter: function(character, system, from) {
	    common_situation(character, system, from, function() {
		accumulate('Biofuel market expands.  Food production declines.');
		increment_both(character, system, 'environment');
		decrement_both(character, system, 'agriculture');
		increment_both(character, system, 'energy');
	    }, 'industrialization');
	},
	act: wake_sleep_act,
	exit: walk,
    }),
    stars: new undum.Situation({
	x: Math.sqrt(3),
	y: -1,
	icon: document.getElementById('sun'),
	enter: function(character, system, from) {
	    common_situation(character, system, from, function() {
		accumulate('Interstellar lifeboat launched.  Society abandons planet and moon.');
		system.setQuality('cryostasis', 0);
		system.setQuality('planet_state', null);
		system.setQuality('moon_state', null);
		lifeboat_all(character, system);
	    }, 'environmentalism');
	},
	act: wake_sleep_act,
	exit: walk,
    }),
    water: new undum.Situation({
	x: Math.sqrt(3),
	y: 1,
	icon: document.getElementById('water'),
	enter: function(character, system, from) {
	    common_situation(character, system, from, function() {
		increment_both(character, system, 'water');
		increment_both(character, system, 'water');
		if (character.qualities.desalination > 0) {
		    accumulate('Mass desalination turns oceans into freshwater sources.  Oceans suffer from unbridled consumption.');
		    decrement_both(character, system, 'environment');
		    decrement_both(character, system, 'environment');
		    increment_both(character, system, 'water');
		    increment_both(character, system, 'water');
		    increment_both(character, system, 'water');
		} else {
		    accumulate('Water conservation program in place.  Agricultural downturn due to irrigation limits.');
		    decrement_both(character, system, 'agriculture');
		}
	    }, 'war');
	},
	act: wake_sleep_act,
	exit: walk,
    }),
};

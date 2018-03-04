vōlōr
=====

Thanks for stopping by! :smiley:

After reading through this, please feel free to clone this repo and play around! I think you'll be surprised how addicting tweaking recipies and generating content can be :stuck_out_tongue_winking_eye:

What is vōlōr?
--------------

vōlōr is a Procedural Content Generator.

What is... that?
----------------

[PCG](http://pcg.wikidot.com/ "Procedural Content Generation") is a way to define a set of rules or bounds that yield game content that's as predictable or unpredictable as the author wants.

For me, the main thing that has me so enthralled with PCG is the idea that I can build a game and (hopefully) still have the same experience as everyone else when they encounter parts of the game for the first time. As I'm building this tool now, I'm not sure that "first time" expereince is possible. Worst case scenario, though, I build a useful and fun tool that adds lots of varied content to games!

How it works
============

vōlōr has two parts:

configs
-------

A config is a JSON object containing all information required to build a specific type of content.

vōlōr has several built-in configs:

* **path**: The directions available to move in (up, down, left, right) and the width/height rules for each path tile
* **tile_properties**: Uses the width/height of path tiles to assign properties describing the tile (eg: wide, tall, big, small, vertical, etc)
* **tiles**: Specify landscape types to add to path tiles with certain properties
* **landscape**: Builds specified landscape types according to config rules
* **platforms**: Adds platforms to tile, following rules specified in config

There are no hard rules regarding the structure of configs. Look through the [configs](https://github.com/MayBGames/volor/tree/master/recipies/DEFAULT/config "Built-in configs available") vōlōr ships with to get an idea how they work.

There is one convention you'll see in several of the configs: a `meta` property. The `meta` property, when specified, contains helpful information about the config itself.

You'll also notice that pretty much all config property leaf nodes have `min`/`max` properties with `Integer` values. While a helpful pattern, it is not required. Configs you create can have leaf nodes with whatever property/value combos make the most sense.

delegates
---------

A delegate uses a config to generate content.

vōlōr has several built-in delegates:

* **path**:
  1. Generates path tiles until `recipe.total_volume` has been used up
  2. Builds up a three dimentional grid of arrays with the structure `grid[tile][x][y]` where `x` is the width axis and `y` is the height axis
* **tiles**: Assigns properties to path tiles
* **landscape**:
  1. Generates landscape elements (which are stored in the `recipe.landscape.generated` array)
  2. Adds all generated landscape elements to `recipe[grid]` in the appropriate `x` and `y` ranges
* **platforms**:
  1. Generates platforms according to config (which are stored in the `recipe.platforms.generated` array)
  2. Adds all generated platforms to `recipe[grid]` in the appropriate `x` and `y` ranges

render pipeline
===============

The delegates and configs are organized by the `render_pipeline`. The `render_pipeline` specifies what delegates to execute, and the order to execute them.

**NOTE** _Order of delegate execution matters_

_MORE TO COME_
==============
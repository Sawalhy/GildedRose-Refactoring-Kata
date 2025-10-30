const AGED_BRIE = "Aged Brie"
const SULFURAS = "Sulfuras, Hand of Ragnaros"
const BCKSTSPASS = 'Backstage passes to a TAFKAL80ETC concert'


export class Item {
	name: string;
	sellIn: number;
	quality: number;

	constructor(name, sellIn, quality) {
		this.name = name;
		this.sellIn = sellIn;
		this.quality = quality;
	}
}

export class GildedRose {
	items: Array<Item>;

	constructor(items = [] as Array<Item>) {
		this.items = items;
	}

	updateQuality() {

		function increaseItemQuality(item: Item) {
			if (item.quality < 50) {
				item.quality = item.quality + 1
			}
		}
		function decreaseItemQuality(item: Item) {
			if (item.quality > 0) {
				item.quality = item.quality - 1
			}
		}

		for (let i = 0; i < this.items.length; i++) {
			const item = this.items[i]
			if (item.name === SULFURAS) {
				continue;
			}

			if (item.name != AGED_BRIE && item.name != BCKSTSPASS) {
				decreaseItemQuality(item)
			} else {
				if (item.quality < 50) {
					item.quality = item.quality + 1
					if (item.name == BCKSTSPASS) {
						if (item.sellIn < 11) {
							increaseItemQuality(item)
						}
						if (item.sellIn < 6) {
							increaseItemQuality(item)
						}
					}
				}
			}

			item.sellIn = item.sellIn - 1;

			if (item.sellIn < 0) {
				switch (item.name) {
					case AGED_BRIE:
						increaseItemQuality(item);
						break;
					case BCKSTSPASS:
						item.quality = 0;
						break;
					default:
						decreaseItemQuality(item);
				}
			}
		}

		return this.items;
	}
}

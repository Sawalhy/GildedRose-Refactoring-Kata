const AGED_BRIE = "Aged Brie"
const SULFURAS = "Sulfuras, Hand of Ragnaros"
const BACKSTAGE_PASS = 'Backstage passes to a TAFKAL80ETC concert'


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
			//If Sulfuras -> Ignore
			if (item.name === SULFURAS) {
				continue;
			}
			item.sellIn = item.sellIn - 1;
			switch (item.name) {
				case AGED_BRIE:
					increaseItemQuality(item)
					if (item.sellIn < 0)
						increaseItemQuality(item);
					break;
				case BACKSTAGE_PASS:
					increaseItemQuality(item)
					if (item.sellIn < 0) {
						item.quality = 0;
						break;
					}
					if (item.sellIn < 10) {
						increaseItemQuality(item);
					}
					if (item.sellIn < 5) {
						increaseItemQuality(item);
					}
					break;
				default:
					if (item.sellIn < 0)
						decreaseItemQuality(item);
					decreaseItemQuality(item);
			}

		}

		return this.items;
	}
}

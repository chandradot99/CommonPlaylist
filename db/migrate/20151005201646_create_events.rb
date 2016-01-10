class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.date :date
      t.time :time
      t.text :venue

      t.timestamps null: false
    end
  end
end

class ChangeDateTimeDatatype < ActiveRecord::Migration
  def up
    change_column :events, :date, :string
    change_column :events, :time, :string
  end

  def down
    change_column :events, :date, :date
    change_column :events, :time, :time
  end
end

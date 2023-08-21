create database "wsp010";
create role "wsp010" with password 'wsp010' superuser;
alter role "wsp010" with login;

\c wsp010;

create table "user" (
  id serial primary key
, username varchar(255) not null
, password varchar(255) not null
);

create table memo (
  id serial primary key
, content text not null
, filename varchar(255)
);

insert into "user" (username, password) values
  ('alex@tecky.io', 'tecky')
;

create table "like" (
  id serial primary key
, user_id integer not null references "user"(id)
, memo_id integer not null references "memo"(id)
);

alter table "user"
add column "is_admin" boolean default false
;

update "user" set is_admin = true where id = 1;

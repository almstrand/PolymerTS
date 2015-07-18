@component("computed-properties-test")
class ComputedPropertiesTest extends polymer.Base
{
   @property() first  = 1;   
   @property() second = 1;
   
   @computed() computed1(first, second)
   {
      return first + second;
   }     
                  
   @property({ computed: 'getcomputed2(first,second)' })
   computed2: number;

   getcomputed2()
   {
      return this.first + this.second;
   }                    
}

ComputedPropertiesTest.register();

@component("custom-constructor-test")
@template("<div>this element has a custom constructor</div>")
class CustomConstructorTest extends polymer.Base
{
   @property() bar: string;

   constructor(foo: string)
   {
      super();
      this.bar = foo;
   }
}

CustomConstructorTest.register();

@component("property-initialization-test")
@template("")
class PropertyInitializationTest extends polymer.Base {
   @property() bar = "mybar"

   @property() foo: string;

   @property({ value: "mywar" }) war;

   constructor() {
      super();
      this.foo = "myfoo";
   }
}

PropertyInitializationTest.register();        

@component("double-initialization-test")
@template("")
class DoubleInitializationTest extends polymer.Base {
   @property() bar="mybar"

   @property() foo: string;

   @property({ value: "mywar" }) war;

   constructor() {
      super();
      this.foo="myfoo";
   }
}

@component("uninitialized-test")
@template("")
class UnInitializedTest extends polymer.Base
{
   @property() bar = "mybar"
}

@component("no-factory-impl-test")
@template("")
class NoFactoryImplTest extends polymer.Base
{
   factoryImpl()
   {      
      return null;
   }
}

@component("listener-test")
@template("")
class ListenerTest extends polymer.Base
{
   @property() bar="mybar";

   constructor() {      
      super();
      this.fire("change-bar");      
   }

   @listen("change-bar")
   changeBarEvent()
   {
      this.bar = "foo";
   }
}

ListenerTest.register();

@component("observer-test")
@template("")
class ObserverTest extends polymer.Base {
   @property() bar="mybar";
   @property() foo="myfoo";
   @property() nbar_changed = 0;
   @property() nbar_foo_changed = 0;

   @observe("bar")
   changedBar() {
      this.nbar_changed++;
   }

   @observe("bar,foo")
   changedBarAndFoo() {
      this.nbar_foo_changed++;
   }
}

ObserverTest.register();

class BehaviorBaseTest extends polymer.Base {
   hasfired: boolean;

   @listen("base-called")
   onBaseCalled() {
      this.hasfired = true;   
   }
}

@component("behavior-test1")
@template("")            
@behavior(BehaviorBaseTest)
class BehaviorTest1 extends polymer.Base
{
   @property() bar="mybar";
   @property() hasfired=false;

   attached()
   {
      this.fire("base-called");
   }
}

BehaviorTest1.register();

@component("behavior-test2")
@template("")
class BehaviorTest2 extends polymer.Base {
   @property() bar="mybar";
   @property() hasfired=false;
   @behavior(BehaviorBaseTest)

   attached() {
      this.fire("base-called");
   }
}

BehaviorTest2.register();


@component("template-test")

@template("<div>this element is made from a template<div id='inner'>inner text</div></div>")

@style
(`
   :host { display: block; }
   div { color: red; }
   #inner { width: 50px; }
`)

class TemplateTest extends polymer.Base
{
   @property() bar="mybar";   
}

TemplateTest.register();
